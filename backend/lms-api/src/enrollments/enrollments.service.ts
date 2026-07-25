import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async getUserEnrollments(userId?: string) {
    // Fallback to first student if userId not passed
    const targetUserId = userId || (await this.getStudentId());

    return this.prisma.enrollment.findMany({
      where: { userId: targetUserId },
      include: {
        course: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
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

    return this.prisma.enrollment.create({
      data: {
        userId: targetUserId,
        courseId,
        totalLessons: course?.totalLessons || 10,
      },
      include: { course: true },
    });
  }

  private async getStudentId(): Promise<string> {
    const user = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    return user?.id || '';
  }
}
