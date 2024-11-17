import { Controller, Get } from '@nestjs/common';
import { WorkDayService } from './workday.service';

@Controller('workday')
export class WorkDayController {
  constructor(private readonly workDayService: WorkDayService) {}

  @Get('initialize')
  async initializeWorkDay(): Promise<string> {
    await this.workDayService.initializeWorkDay();
    return 'Initialisation du jour de travail terminée';
  }
//   @Get('analytics')
//   async getAnalytics(){
//     return await this.workDayService.getStatisticsByPeriod('month');
//   }
}
