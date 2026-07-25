import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string, userId?: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            course: true,
          },
        },
        quizzes: { where: { quizType: 'IN_LESSON' } },
        lessonProgresses: userId ? { where: { userId } } : false,
      },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson tidak ditemukan');
    }

    const progress = (lesson as any).lessonProgresses;
    const completed =
      progress && Array.isArray(progress) && progress.length > 0
        ? progress[0].completed
        : false;

    return {
      ...lesson,
      completed,
      inLessonQuiz: lesson.quizzes.length > 0 ? lesson.quizzes[0] : null,
    };
  }

  async markComplete(lessonId: string, userId?: string) {
    const student = await this.resolveUserId(userId);

    // Upsert lesson progress
    await this.prisma.lessonProgress.upsert({
      where: {
        lessonId_userId: { lessonId, userId: student },
      },
      update: { completed: true, completedAt: new Date() },
      create: {
        lessonId,
        userId: student,
        completed: true,
        completedAt: new Date(),
      },
    });

    // Update enrollment progress
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: { include: { course: true } } },
    });

    if (lesson) {
      const courseId = lesson.module.courseId;

      // Count total lessons in the course
      const totalLessons = await this.prisma.lesson.count({
        where: { module: { courseId } },
      });

      // Count completed lessons for this user in this course
      const completedLessons = await this.prisma.lessonProgress.count({
        where: {
          userId: student,
          completed: true,
          lesson: { module: { courseId } },
        },
      });

      const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

      await this.prisma.enrollment.updateMany({
        where: { userId: student, courseId },
        data: {
          completedLessons,
          totalLessons,
          progressPercentage,
          status: progressPercentage >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
        },
      });
    }

    return { success: true, lessonId };
  }

  private async resolveUserId(userId?: string): Promise<string> {
    if (userId) return userId;
    const user = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    return user?.id || '';
  }
}
