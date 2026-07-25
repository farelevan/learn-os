import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async findByLesson(lessonId: string) {
    return this.prisma.quiz.findFirst({
      where: { lessonId, quizType: 'IN_LESSON' },
    });
  }

  async findByModule(moduleId: string) {
    return this.prisma.quiz.findFirst({
      where: { moduleId, quizType: 'MODULE' },
    });
  }

  async submitQuiz(
    quizId: string,
    answers: number[],
    userId?: string,
  ) {
    const student = await this.resolveUserId(userId);

    const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) {
      throw new NotFoundException('Quiz tidak ditemukan');
    }

    const questions = JSON.parse(quiz.questions) as {
      question: string;
      options: string[];
      correctIndex: number;
    }[];

    // Grade the quiz
    let correctCount = 0;
    const results = questions.map((q, i) => {
      const userAnswer = answers[i] ?? -1;
      const isCorrect = userAnswer === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        userAnswer,
        correctIndex: q.correctIndex,
        isCorrect,
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= quiz.passingScore;

    // Save attempt
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quizId,
        userId: student,
        score,
        passed,
        answers: JSON.stringify(answers),
      },
    });

    // If this is a module quiz and passed, check if ALL module quizzes in the
    // course are passed → auto-generate certificate
    let certificateGenerated = false;
    if (passed && quiz.quizType === 'MODULE' && quiz.moduleId) {
      certificateGenerated = await this.checkAndGenerateCertificate(
        quiz.moduleId,
        student,
      );
    }

    return {
      attemptId: attempt.id,
      score,
      passed,
      passingScore: quiz.passingScore,
      totalQuestions: questions.length,
      correctCount,
      results,
      certificateGenerated,
    };
  }

  private async checkAndGenerateCertificate(
    moduleId: string,
    userId: string,
  ): Promise<boolean> {
    // Find the course this module belongs to
    const module = await this.prisma.module.findUnique({
      where: { id: moduleId },
      include: { course: true },
    });
    if (!module) return false;

    const courseId = module.courseId;

    // Get all module quizzes for this course
    const moduleQuizzes = await this.prisma.quiz.findMany({
      where: {
        quizType: 'MODULE',
        module: { courseId },
      },
    });

    // Check if user passed all module quizzes
    for (const mq of moduleQuizzes) {
      const passedAttempt = await this.prisma.quizAttempt.findFirst({
        where: { quizId: mq.id, userId, passed: true },
      });
      if (!passedAttempt) return false; // Not all passed yet
    }

    // Check if certificate already exists for this course
    const existingCert = await this.prisma.certificate.findFirst({
      where: {
        userId,
        title: module.course.title,
      },
    });
    if (existingCert) return false; // Already generated

    // Generate certificate
    const certNumber = `CRS-${Date.now().toString(36).toUpperCase()}`;
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    await this.prisma.certificate.create({
      data: {
        userId,
        title: module.course.title,
        subTitle: 'CERTIFICATE OF COMPLETION',
        type: 'COURSE',
        certNumber,
        issuedDate: today,
      },
    });

    // Update enrollment status
    await this.prisma.enrollment.updateMany({
      where: { userId, courseId },
      data: {
        status: 'COMPLETED',
        progressPercentage: 100,
      },
    });

    return true;
  }

  private async resolveUserId(userId?: string): Promise<string> {
    if (userId) return userId;
    const user = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    return user?.id || '';
  }
}
