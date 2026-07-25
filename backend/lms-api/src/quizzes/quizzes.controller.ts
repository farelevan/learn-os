import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get('lesson/:lessonId')
  async findByLesson(@Param('lessonId') lessonId: string) {
    return this.quizzesService.findByLesson(lessonId);
  }

  @Get('module/:moduleId')
  async findByModule(@Param('moduleId') moduleId: string) {
    return this.quizzesService.findByModule(moduleId);
  }

  @Post(':id/submit')
  async submitQuiz(
    @Param('id') id: string,
    @Body('answers') answers: number[],
    @Query('userId') userId?: string,
  ) {
    return this.quizzesService.submitQuiz(id, answers, userId);
  }
}
