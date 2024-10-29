/*
  Warnings:

  - You are about to drop the column `createAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `ReplenishmentOrder` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `UserPermission` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_roleId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeePermission" DROP CONSTRAINT "EmployeePermission_EmployeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeePermission" DROP CONSTRAINT "EmployeePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_employeeId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ReplenishmentOrder" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RolePermission" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employee" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserPermission" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "EmployeePermission";

-- DropTable
DROP TABLE "Schedule";
