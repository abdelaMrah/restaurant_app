/*
  Warnings:

  - Added the required column `quantity` to the `ReplenishmentOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReplenishmentOrder" ADD COLUMN     "quantity" INTEGER NOT NULL;
