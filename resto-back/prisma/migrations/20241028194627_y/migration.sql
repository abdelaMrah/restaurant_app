/*
  Warnings:

  - You are about to drop the column `employee` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Permission" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RolePermission" ADD COLUMN     "isGranted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "employee";

-- AlterTable
ALTER TABLE "UserPermission" ALTER COLUMN "isGranted" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
