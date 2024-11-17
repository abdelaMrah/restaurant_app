-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "RolePermission" ALTER COLUMN "isGranted" SET DEFAULT true;
