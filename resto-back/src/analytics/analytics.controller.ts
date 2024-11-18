import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import * as dayjs from 'dayjs';


@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  create(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get()
 async findAll(  @
  Query('startDate') startDate: string,
  @Query('endDate') endDate: string,) {
    const start = startDate ? dayjs(startDate).startOf('day').toISOString() : dayjs().subtract(7, 'days').startOf('day').toISOString();
    const end = endDate ? dayjs(endDate).endOf('day').toISOString() : dayjs().endOf('day').toISOString();
    const res = await this.analyticsService.getStatisticsByPeriod(start,end)
     return res
  }
@Get('revenu')
getRevenuByDay(@Query('period') period?:'week' | 'month' | 'year'){
  return this.analyticsService.getTotalRevenueByPeriod(period)
}
@Get('revenu-category')
async getRevenuByCategories(@Query('period') period?:'week' | 'month' | 'year'){
  const res =await this.analyticsService.getRevenuByCategories(period)
  
  return res
}
@Get('revenu-items')
getRevenuByItems(){
  return this.analyticsService.getItemsRevenue()
}
@Get('revenu-total')
getTotalRevenu(){
  return this.analyticsService.getTotalRevnu()
}
@Get('hour-salary')
getHourSalary(@Query('workday') workday?:string){
try {
  
  return this.analyticsService.getTotalRevenueperHour(workday)
  
} catch (error) {
  return error
}
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnalyticsDto: UpdateAnalyticsDto) {
    return this.analyticsService.update(+id, updateAnalyticsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticsService.remove(+id);
  }
}
