import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class WorkDayService {
  private readonly logger = new Logger(WorkDayService.name);

  constructor(private prisma: PrismaService,@Inject(CACHE_MANAGER) private cacheManager:Cache) {}

  @Cron('0 6 * * *') 
  async initializeWorkDay(): Promise<void> {
    const today = new Date();
    today.setHours(6, 0, 0, 0);

    let existingWorkDay = await this.prisma.workDay.findUnique({
      where: {
        date: today,
      },
    });
    

    if (!existingWorkDay) {
    existingWorkDay=  await this.prisma.workDay.create({
        data: {
          date: today,
          isOpen: true, 
        },
      });
      
      await this.cacheManager.set('work_day',existingWorkDay.id);
      this.logger.log('Jour de travail initialisé à 6:00.');
    } else {
      const current =await this.cacheManager.get('work_day') as string;
      if(!current) await this.cacheManager.set('work_day',existingWorkDay.id);
      this.logger.log('Le jour de travail existe déjà.');
    }
  }
  async getCurrentWorkDay(){
    const currentWorkDay = await this.cacheManager.get('work_day') as number
    if(currentWorkDay) return currentWorkDay;
    await this.initializeWorkDay()
    return await this.cacheManager.get('work_day') as number;
  }

  async getAnalytics(){
    try {
        const res =await this.prisma.$queryRaw`
         SELECT hour, total_orders, total_menu_items, total_revenue
         FROM public.orders_summary_by_hour;

        ` as any[]
       
       return JSON.stringify(res, (_, value) =>
        typeof value === "bigint" ? Number(value) : value,
      )
    } catch (error) {
        throw error
    }
  }


  

}
const transformBigInt = (value: any) => {
    if (typeof value === 'bigint') {
      return Number(value);
    }
    return value;
  };