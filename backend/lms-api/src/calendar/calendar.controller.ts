import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('events')
  async getUserEvents(@Request() req: any) {
    const userId = req.user?.id;
    return this.calendarService.getUserEvents(userId);
  }

  @Post('events')
  async createEvent(
    @Body('title') title: string,
    @Body('dateBadge') dateBadge: string,
    @Body('dayNumber') dayNumber: string,
    @Body('timeRange') timeRange: string,
    @Request() req: any,
  ) {
    const userId = req.user?.id;
    return this.calendarService.createEvent(title, dateBadge, dayNumber, timeRange, userId);
  }
}
