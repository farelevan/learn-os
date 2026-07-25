import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async findByCourseId(courseId: string, userId?: string) {
    const student = await this.resolveUserId(userId);

    const modules = await this.prisma.module.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' },
          include: {
            quizzes: { where: { quizType: 'IN_LESSON' } },
            lessonProgresses: student ? { where: { userId: student } } : false,
          },
        },
        quizzes: { where: { quizType: 'MODULE' } },
      },
    });

    // Enrich with completion status & explicit DONE status
    return modules.map((mod) => {
      const lessons = mod.lessons.map((lesson) => {
        const progress = (lesson as any).lessonProgresses;
        const completed =
          progress && Array.isArray(progress) && progress.length > 0
            ? progress[0].completed
            : false;

        return {
          id: lesson.id,
          moduleId: lesson.moduleId,
          title: lesson.title,
          description: lesson.description,
          youtubeUrl: lesson.youtubeUrl,
          duration: lesson.duration,
          orderIndex: lesson.orderIndex,
          completed,
          status: completed ? 'DONE' : 'IN_PROGRESS',
          hasQuiz: lesson.quizzes.length > 0,
        };
      });

      const completedLessons = lessons.filter((l) => l.completed).length;
      const totalLessons = lessons.length;
      const progressPercentage =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      const isCompleted = completedLessons === totalLessons && totalLessons > 0;

      return {
        id: mod.id,
        courseId: mod.courseId,
        title: mod.title,
        description: mod.description,
        orderIndex: mod.orderIndex,
        lessons,
        moduleQuiz: mod.quizzes.length > 0 ? mod.quizzes[0] : null,
        totalLessons,
        completedLessons,
        progressPercentage,
        isCompleted,
        status: isCompleted ? 'DONE' : 'IN_PROGRESS',
      };
    });
  }

  private async resolveUserId(userId?: string): Promise<string> {
    if (userId) return userId;
    const user = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    return user?.id || '';
  }
}
