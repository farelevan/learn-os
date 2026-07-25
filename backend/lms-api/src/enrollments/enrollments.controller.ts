import { Controller, Get, Post, Param, Request, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get('my-learning')
  async getMyLearning(@Request() req: any) {
    const userId = req.user?.id;
    return this.enrollmentsService.getUserEnrollments(userId);
  }

  @Post(':courseId')
  async enroll(@Param('courseId') courseId: string, @Request() req: any) {
    const userId = req.user?.id;
    return this.enrollmentsService.enroll(courseId, userId);
  }
}
