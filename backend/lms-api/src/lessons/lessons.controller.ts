import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('userId') userId?: string) {
    return this.lessonsService.findOne(id, userId);
  }

  @Post(':id/complete')
  async markComplete(
    @Param('id') id: string,
    @Query('userId') userId?: string,
  ) {
    return this.lessonsService.markComplete(id, userId);
  }
}
