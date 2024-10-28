/*
  Warnings:

  - You are about to alter the column `price` on the `Dish` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to drop the column `createdAt` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "createAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "createAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "createdAt",
ALTER COLUMN "createAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "createAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP NOT NULL;
