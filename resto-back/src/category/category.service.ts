import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma:PrismaService){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({data:createCategoryDto})
  }

 async findAll() {
    return await this.prisma.category.findMany();
  }
async getCount(){
  return this.prisma.category.count();
}
 async findOne(id: number) {
    return await this.prisma.category.findUnique({
      where:{
        id
      }
    });
  }
  async getCategorisMenu(){
    try {
//       const res = await this.prisma.$queryRaw`
//       SELECT 
//     c.id AS "categoryId",
//     c.name AS "categoryName",
//     jsonb_agg(
//         jsonb_build_object(
//             'id', m.id,
//             'name', m.name,
//             'description', m.description,
//             'imageUrl', m."imageUrl",
//             'price', m.price,
//             'isAvailable', m."isAvailable",
//             'createdAt', m."createdAt",
//             'updatedAt', m."updatedAt"
//         )
//     ) AS "menuItems"
// FROM 
//     "Category" c
// JOIN 
//     "MenuItem" m ON m."categoryId" = c.id
// GROUP BY 
//     c.id, c.name;

//       `
    const res =await this.prisma.$queryRaw`
      SELECT 
          c.id AS "categoryId",
          c.name AS "categoryName",
          json_agg(
              json_build_object(
                  'id', m.id,
                  'name', m.name,
                  'description', m.description,
                  -- 'imageUrl', m."imageUrl",
                  'price', m.price,
                  -- 'isAvailable', m."isAvailable",
                  'createdAt', m."createdAt",
                  -- 'updatedAt', m."updatedAt",
                  'totalSales', COALESCE(total_sales.total, 0)
              )
          ) AS "menuItems"
      FROM 
          "Category" c
      JOIN 
          "MenuItem" m ON m."categoryId" = c.id
      LEFT JOIN 
          (
              SELECT 
                  oi."menuItemId", 
                  SUM(oi.quantity) AS total
              FROM 
                  "OrderItem" oi
              GROUP BY 
                  oi."menuItemId"
          ) total_sales ON total_sales."menuItemId" = m.id
      GROUP BY 
          c.id, c.name;
`
      return res
    } catch (error) {
      throw error
    }
  }
 async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return  await this.prisma.category.update({
      where:{id},
      data:{...updateCategoryDto,updatedAt:new Date()}
    })
  }

 async remove(id: number) {
   await this.prisma.category.delete({where:{id}})
  }
  async mostMenuItemPopular(){
    try {
      const res = await this.prisma.$queryRaw`
      SELECT 
    mi."name" AS plate_name,
    mi."categoryId" as categoy,
    mi."price" as price,
    SUM(oi.quantity) AS total_orders
FROM 
    "MenuItem" mi  -- Utilisez des guillemets ici si la table est sensible à la casse
JOIN 
    "OrderItem" oi ON mi.id = oi."menuItemId"
JOIN 
    "Order" o ON oi."orderId" = o.id
WHERE 
    o."createdAt" >= NOW() - INTERVAL '7 days'
GROUP BY 
    mi.id
ORDER BY 
    total_orders DESC
LIMIT 10;

      `
       return JSON.stringify(res, (_, value) =>
        typeof value === "bigint" ? Number(value) : value,
      );
      
     } catch (error) {
      throw error
    }
  }
}
