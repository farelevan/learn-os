import { Controller, Get, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  async getSummary(@Request() req: any) {
    const userId = req.user?.id;
    return this.dashboardService.getDashboardSummary(userId);
  }
}
