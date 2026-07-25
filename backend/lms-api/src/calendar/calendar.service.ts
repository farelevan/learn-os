import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getUserEvents(userId?: string) {
    const student = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });
    const targetUserId = userId || student?.id || '';

    return this.prisma.calendarEvent.findMany({
      where: { userId: targetUserId },
      orderBy: { eventDate: 'asc' },
    });
  }

  async createEvent(
    title: string,
    dateBadge: string,
    dayNumber: string,
    timeRange: string,
    userId?: string,
  ) {
    const student = await this.prisma.user.findFirst({ where: { role: 'STUDENT' } });

    return this.prisma.calendarEvent.create({
      data: {
        userId: userId || student?.id || '',
        title,
        dateBadge,
        dayNumber,
        timeRange,
      },
    });
  }
}
