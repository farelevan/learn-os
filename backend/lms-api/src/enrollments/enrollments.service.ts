import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async getUserEnrollments(userId?: string) {
    const targetUserId = userId || (await this.getStudentId());

    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId: targetUserId },
      include: {
        course: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Re-calculate real-time progress for each enrollment from LessonProgress table
    return Promise.all(
      enrollments.map(async (e) => {
        const totalLessons = await this.prisma.lesson.count({
          where: { module: { courseId: e.courseId } },
        });

        const completedLessons = await this.prisma.lessonProgress.count({
          where: {
            userId: targetUserId,
            completed: true,
            lesson: { module: { courseId: e.courseId } },
          },
        });

        const effectiveTotal = totalLessons > 0 ? totalLessons : e.totalLessons || 10;
        const effectiveCompleted = Math.min(completedLessons, effectiveTotal);
        const progressPercentage = Math.round((effectiveCompleted / effectiveTotal) * 100);

        const isDone = progressPercentage >= 100 || e.status === 'COMPLETED';
        const statusText = isDone ? 'DONE' : 'IN_PROGRESS';

        return {
          ...e,
          completedLessons: effectiveCompleted,
          totalLessons: effectiveTotal,
          progressPercentage,
          status: isDone ? 'COMPLETED' : 'IN_PROGRESS',
          statusText,
          isDone,
        };
      }),
    );
  }

  async enroll(courseId: string, userId?: string) {
    const targetUserId = userId || (await this.getStudentId());

    const existing = await this.prisma.enrollment.findFirst({
      where: { userId: targetUserId, courseId },
    });

    if (existing) {
      throw new BadRequestException('Anda sudah terdaftar di kursus ini.');
    }

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    const totalLessons = await this.prisma.lesson.count({
      where: { module: { courseId } },
    });

    return this.prisma.enrollment.create({
      data: {
        userId: targetUserId,
        courseId,
        totalLessons: totalLessons > 0 ? totalLessons : course?.totalLessons || 10,
        completedLessons: 0,
        progressPercentage: 0,
        status: 'IN_PROGRESS',
      },
      include: { course: true },
    });
  }

  private async getStudentId(): Promise<string> {
    const user = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    return user?.id || '';
  }
}
