import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async findByCourseId(courseId: string, userId?: string) {
    const modules = await this.prisma.module.findMany({
      where: { courseId },
      orderBy: { orderIndex: 'asc' },
      include: {
        lessons: {
          orderBy: { orderIndex: 'asc' },
          include: {
            quizzes: { where: { quizType: 'IN_LESSON' } },
            lessonProgresses: userId ? { where: { userId } } : false,
          },
        },
        quizzes: { where: { quizType: 'MODULE' } },
      },
    });

    // Enrich with completion status for the user
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
          hasQuiz: lesson.quizzes.length > 0,
        };
      });

      const completedLessons = lessons.filter((l) => l.completed).length;

      return {
        id: mod.id,
        courseId: mod.courseId,
        title: mod.title,
        description: mod.description,
        orderIndex: mod.orderIndex,
        lessons,
        moduleQuiz: mod.quizzes.length > 0 ? mod.quizzes[0] : null,
        totalLessons: lessons.length,
        completedLessons,
        isCompleted: completedLessons === lessons.length && lessons.length > 0,
      };
    });
  }
}
