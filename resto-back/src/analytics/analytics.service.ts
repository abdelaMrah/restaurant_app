import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma:PrismaService){}
  create(createAnalyticsDto: CreateAnalyticsDto) {
    return 'This action adds a new analytics';
  }

  findAll() {
    return `This action returns all analytics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }

  async getStatisticsByPeriod(period: 'hour' | 'day' | 'week' | 'month' | 'year'='hour') {
    let datePart;

    switch (period) {
      case 'hour':
        datePart = "DATE_PART('hour', o.\"createdAt\")";
        break;
      case 'day':
        datePart = "DATE_TRUNC('day', o.\"createdAt\")";
        break;
      case 'week':
        datePart = "DATE_TRUNC('week', o.\"createdAt\")";
        break;
      case 'month':
        datePart = "DATE_TRUNC('month', o.\"createdAt\")";
        break;
      case 'year':
        datePart = "DATE_TRUNC('year', o.\"createdAt\")";
        break;
      default:
        throw new Error('Invalid period');
    }

    const result = await this.prisma.$queryRawUnsafe(`
      SELECT 
        ${datePart} AS period,
        COUNT(DISTINCT o.id) AS total_orders,
        SUM(oi."quantity") AS total_menu_items,
        SUM(oi."quantity" * mi."price") AS total_revenue
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      JOIN "MenuItem" mi ON oi."menuItemId" = mi.id
      GROUP BY period
      ORDER BY period;
    `);

    return JSON.stringify(result, (_, value) =>
        typeof value === "bigint" ? Number(value) : value,
      )
  }
}
