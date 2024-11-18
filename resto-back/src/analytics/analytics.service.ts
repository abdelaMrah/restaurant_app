import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as dayjs from 'dayjs';
@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}
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
  async getTotalRevnu(){
    const res=await this.prisma.$queryRawUnsafe(`
      SELECT 
      SUM(oi."quantity") AS total_items_sold,
      SUM(oi."quantity" * mi."price") AS total_revenue
    FROM 
      "OrderItem" oi
    JOIN 
      "MenuItem" mi ON oi."menuItemId" = mi.id;
      `)
      return JSON.stringify(res, (_, value) =>
        typeof value === 'bigint' ? Number(value) : value,
      );
  }
  async getItemsRevenue(){
    const res = await this.prisma.$queryRawUnsafe(`
      SELECT 
      c."name" AS category_name,
      mi."name" AS item_name,
      SUM(oi."quantity") AS total_sales_count,
      SUM(oi."quantity" * mi."price") AS total_revenue
      FROM 
        "OrderItem" oi
      JOIN 
        "MenuItem" mi ON oi."menuItemId" = mi.id
      JOIN 
        "Category" c ON mi."categoryId" = c.id
      GROUP BY 
        c."name", mi."name"
      ORDER BY 
        total_sales_count DESC, total_revenue DESC
        limit 6;

      `)
      return JSON.stringify(res, (_, value) =>
        typeof value === 'bigint' ? Number(value) : value,
      );
  }
  async getRevenuByCategories(period: 'week' | 'month' | 'year') {
    let datePart;
  
    // Définir la période de la date
    switch (period) {
      case 'week':
        datePart = "DATE_TRUNC('week', o.\"createdAt\")";  // Truncation de la date à la semaine
        break;
      case 'month':
        datePart = "DATE_TRUNC('month', o.\"createdAt\")"; // Truncation de la date au mois
        break;
      case 'year':
        datePart = "DATE_TRUNC('year', o.\"createdAt\")";  // Truncation de la date à l'année
        break;
      default:
        throw new Error('Invalid period');
    }
  
    // Exécution de la requête SQL avec le regroupement par catégorie et période
    const res = await this.prisma.$queryRawUnsafe(`
      SELECT 
        c."name" AS category_name,
        SUM(oi."quantity" * mi."price") AS total_revenue  -- Calcul du revenu total
      FROM 
        "Order" o
      JOIN 
        "OrderItem" oi ON o.id = oi."orderId"
      JOIN 
        "MenuItem" mi ON oi."menuItemId" = mi.id
      JOIN 
        "Category" c ON mi."categoryId" = c.id
      WHERE 
        o."createdAt" >= CURRENT_DATE - INTERVAL '1 ${period}'  -- Filtrer les commandes dans la période choisie
      GROUP BY 
        c."name"  -- Groupement par catégorie
      ORDER BY 
        total_revenue DESC;  -- Trier par revenu total décroissant
    `);
  
    return JSON.stringify(res, (_, value) =>
      typeof value === 'bigint' ? Number(value) : value,
    );
  }
  
 async getTotalRevenueperHour(workDay:any){
  console.log(dayjs(workDay).set('hour', 5).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
  console.log()
  const workday = await this.prisma.workDay.findFirstOrThrow({where:{
    date:dayjs(workDay).set('hour', 6).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString()
  }});
  if(!workDay) throw new NotFoundException({message:'workday not found'})
   const result = await this.prisma.$queryRaw`
  SELECT 
    EXTRACT(HOUR FROM "Order"."createdAt") AS hour, 
    COUNT(DISTINCT "Order"."id") AS total_orders, 
    SUM("OrderItem"."quantity" * "MenuItem"."price") AS total_revenue,
    MIN("Order"."createdAt") AS first_order_time,
    MAX("Order"."createdAt") AS last_order_time
  FROM 
    "Order"
  JOIN 
    "OrderItem" ON "Order"."id" = "OrderItem"."orderId"
  JOIN 
    "MenuItem" ON "OrderItem"."menuItemId" = "MenuItem"."id"
  WHERE
    "Order"."workDayId" = ${workday.id}
  GROUP BY 
    EXTRACT(HOUR FROM "Order"."createdAt")
  ORDER BY 
    hour;
`;
return JSON.stringify(result, (_, value) =>
  typeof value === 'bigint' ? Number(value) : value,
);
 }

  
  // async getRevenuByCategories() {
  //   const res = await this.prisma.$queryRawUnsafe(`
  //         SELECT 
  //     c."name" AS category_name,
  //     SUM(oi."quantity" * mi."price") AS total_revenue
  //   FROM 
  //     "OrderItem" oi
  //   JOIN 
  //     "MenuItem" mi ON oi."menuItemId" = mi.id
  //   JOIN 
  //     "Category" c ON mi."categoryId" = c.id
  //   GROUP BY 
  //     c."name"
  //   ORDER BY 
  //     total_revenue DESC;

  //     `);
  //     return JSON.stringify(res, (_, value) =>
  //       typeof value === 'bigint' ? Number(value) : value,
  //     );
  // }

  
//   async getTotalDayRevenu() {
//     const result = await this.prisma.$queryRawUnsafe(`
//         SELECT 
//       DATE_TRUNC('day', o."createdAt") AS sale_date,
//       COUNT(DISTINCT o.id) AS total_orders,
//       SUM(oi."quantity") AS total_menu_items,
//       SUM(oi."quantity" * mi."price") AS total_revenue
//     FROM "Order" o
//     JOIN "OrderItem" oi ON o.id = oi."orderId"
//     JOIN "MenuItem" mi ON oi."menuItemId" = mi.id
//     GROUP BY sale_date
//     ORDER BY sale_date;
// `);
//     return JSON.stringify(result, (_, value) =>
//       typeof value === 'bigint' ? Number(value) : value,
//     );
//   }
async getTotalRevenueByPeriod(period: 'week' | 'month' | 'year'='week') {
  let datePart;

  // Définir le type de période basé sur l'argument
  switch (period) {
    case 'week':
      datePart = "DATE_TRUNC('week', o.\"createdAt\")";  // Regroupe par semaine
      break;
    case 'month':
      datePart = "DATE_TRUNC('month', o.\"createdAt\")"; // Regroupe par mois
      break;
    case 'year':
      datePart = "DATE_TRUNC('year', o.\"createdAt\")";  // Regroupe par année
      break;
    default:
      throw new Error('Invalid period');
  }

  // Requête SQL pour récupérer les revenus par jour dans la période spécifiée
  const result = await this.prisma.$queryRawUnsafe(`
    SELECT 
      DATE_TRUNC('day', o."createdAt") AS sale_date,  -- Récupère le revenu par jour
      COUNT(DISTINCT o.id) AS total_orders,
      SUM(oi."quantity") AS total_menu_items,
      SUM(oi."quantity" * mi."price") AS total_revenue
    FROM "Order" o
    JOIN "OrderItem" oi ON o.id = oi."orderId"
    JOIN "MenuItem" mi ON oi."menuItemId" = mi.id
    WHERE o."createdAt" >= CURRENT_DATE - INTERVAL '1 ${period}'  -- Filtre pour la période choisie
    GROUP BY sale_date
    ORDER BY sale_date;
  `);

  return JSON.stringify(result, (_, value) =>
    typeof value === 'bigint' ? Number(value) : value,
  );
}

  // async getStatisticsByPeriod(startDate: string, endDate: string) {
  //   const result = await this.prisma.$queryRawUnsafe(
  //     `
  //     SELECT 
  //       DATE_TRUNC('day', o."createdAt") AS date,
  //       COUNT(DISTINCT o.id) AS totalCustomers,
  //       SUM(oi."quantity" * mi."price") AS totalSales,
  //       MAX(hourly_data.peakCustomerCount) AS peakCustomers,
  //       MAX(hourly_data.peakHour) AS peakHour,
  //       MAX(hourly_data.peakSales) AS peakSales
  //     FROM "Order" o
  //     JOIN "OrderItem" oi ON o.id = oi."orderId"
  //     JOIN "MenuItem" mi ON oi."menuItemId" = mi.id
  //     LEFT JOIN (
  //       SELECT 
  //         DATE_TRUNC('day', sub_o."createdAt") AS sub_date,
  //         DATE_PART('hour', sub_o."createdAt") AS peakHour,
  //         COUNT(sub_o.id) AS peakCustomerCount,
  //         SUM(sub_oi."quantity") AS peakSales
  //       FROM "Order" sub_o
  //       JOIN "OrderItem" sub_oi ON sub_o.id = sub_oi."orderId"
  //       GROUP BY sub_date, peakHour
  //     ) AS hourly_data ON hourly_data.sub_date = DATE_TRUNC('day', o."createdAt")
  //     WHERE EXTRACT(DOW FROM o."createdAt") BETWEEN 0 AND 4 -- Dimanche à Jeudi
  //       AND o."createdAt" BETWEEN $1 AND $2
  //     GROUP BY date
  //     ORDER BY date;
  //   `,
  //     new Date(startDate),
  //     new Date(endDate),
  //   );

  //   return JSON.stringify(result, (_, value) =>
  //     typeof value === 'bigint' ? Number(value) : value,
  //   );
  // }

  async getStatisticsByPeriod(startDate: string, endDate: string) {
    const result = await this.prisma.$queryRawUnsafe(
      `
      SELECT 
        DATE_TRUNC('day', o."createdAt") AS date,
        COUNT(DISTINCT o.id) AS totalCustomers,
        SUM(oi."quantity" * mi."price") AS totalSales,
        MAX(hourly_data.peakCustomerCount) AS peakCustomers,
        MAX(hourly_data.peakHour) AS peakHour,
        MAX(hourly_data.peakSales) AS peakSales
      FROM "Order" o
      JOIN "OrderItem" oi ON o.id = oi."orderId"
      JOIN "MenuItem" mi ON oi."menuItemId" = mi.id
      LEFT JOIN (
        SELECT 
          DATE_TRUNC('day', sub_o."createdAt") AS sub_date,
          DATE_PART('hour', sub_o."createdAt") AS peakHour,
          COUNT(sub_o.id) AS peakCustomerCount,
          SUM(sub_oi."quantity" * sub_mi."price") AS peakSales
        FROM "Order" sub_o
        JOIN "OrderItem" sub_oi ON sub_o.id = sub_oi."orderId"
        JOIN "MenuItem" sub_mi ON sub_oi."menuItemId" = sub_mi.id
        GROUP BY sub_date, peakHour
      ) AS hourly_data ON hourly_data.sub_date = DATE_TRUNC('day', o."createdAt")
      WHERE EXTRACT(DOW FROM o."createdAt") BETWEEN 0 AND 4 -- Dimanche à Jeudi
        AND o."createdAt" BETWEEN $1 AND $2
      GROUP BY date
      ORDER BY date;
      `,
      new Date(startDate),
      new Date(endDate),
    );
  
    return JSON.stringify(result, (_, value) =>
      typeof value === 'bigint' ? Number(value) : value,
    );
  }
  
}
