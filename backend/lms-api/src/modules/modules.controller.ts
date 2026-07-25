import { Controller, Get, Param, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get('course/:courseId')
  async findByCourseId(
    @Param('courseId') courseId: string,
    @Query('userId') userId?: string,
  ) {
    return this.modulesService.findByCourseId(courseId, userId);
  }
}
