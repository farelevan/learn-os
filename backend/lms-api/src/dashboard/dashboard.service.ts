import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardSummary(userId?: string) {
    const student = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    const targetUserId = userId || student?.id || '';

    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId: targetUserId },
      include: { course: true },
    });

    const certificatesCount = await this.prisma.certificate.count({
      where: { userId: targetUserId },
    });

    // Calculate actual progress percentages
    const enrollmentDetails = await Promise.all(
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
        const progressPercentage = Math.round((completedLessons / effectiveTotal) * 100);
        const isDone = progressPercentage >= 100 || e.status === 'COMPLETED';

        return {
          ...e,
          completedLessons,
          totalLessons: effectiveTotal,
          progressPercentage,
          statusText: isDone ? 'DONE' : 'IN_PROGRESS',
        };
      }),
    );

    const activeCoursesCount = enrollments.length;
    const averageProgress =
      enrollmentDetails.length > 0
        ? Math.round(
            enrollmentDetails.reduce((acc, e) => acc + e.progressPercentage, 0) /
              enrollmentDetails.length,
          )
        : 65;

    // Pick course for Continue Learning (either elementary-web-programming or featured)
    const activeEnrollment = enrollmentDetails.find((e) => e.statusText === 'IN_PROGRESS');
    let continueLearningCourse = activeEnrollment
      ? {
          ...activeEnrollment.course,
          progressPercentage: activeEnrollment.progressPercentage,
          completedLessons: activeEnrollment.completedLessons,
          totalLessons: activeEnrollment.totalLessons,
          statusText: activeEnrollment.statusText,
        }
      : null;

    if (!continueLearningCourse) {
      const featured = await this.prisma.course.findFirst({ where: { isFeatured: true } });
      if (featured) {
        continueLearningCourse = {
          ...featured,
          progressPercentage: 32,
          completedLessons: 4,
          totalLessons: 24,
          statusText: 'IN_PROGRESS',
        };
      }
    }

    return {
      user: {
        id: student?.id,
        name: student?.name || 'Farel Evan',
        email: student?.email,
      },
      stats: {
        activeCourses: activeCoursesCount,
        totalLearningHours: 128,
        certificatesEarned: certificatesCount,
        completionRate: `${averageProgress}%`,
        learningStreakDays: 14,
      },
      continueLearning: continueLearningCourse,
      enrollments: enrollmentDetails,
    };
  }
}
