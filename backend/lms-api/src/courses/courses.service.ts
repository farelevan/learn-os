import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string, search?: string) {
    const where: any = {};

    if (category && category !== 'all') {
      where.categoryName = { contains: category, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { instructorName: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findFeatured() {
    return this.prisma.course.findFirst({
      where: { isFeatured: true },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException('Kursus tidak ditemukan');
    }

    return course;
  }
}
