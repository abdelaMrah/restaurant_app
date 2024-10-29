-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('dine_in', 'takeout', 'online');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type" "OrderType" DEFAULT 'takeout';
