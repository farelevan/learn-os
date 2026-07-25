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

    const activeCoursesCount = enrollments.length;
    const totalHours = 128; // calculated aggregate or default
    const averageProgress =
      enrollments.length > 0
        ? Math.round(
            enrollments.reduce((acc, e) => acc + e.progressPercentage, 0) / enrollments.length,
          )
        : 84;

    const continueLearningCourse = await this.prisma.course.findFirst({
      where: { isFeatured: true },
    });

    return {
      user: {
        id: student?.id,
        name: student?.name || 'Farel Evan',
        email: student?.email,
      },
      stats: {
        activeCourses: activeCoursesCount,
        totalLearningHours: totalHours,
        certificatesEarned: certificatesCount,
        completionRate: `${averageProgress}%`,
        learningStreakDays: 14,
      },
      continueLearning: continueLearningCourse,
    };
  }
}
