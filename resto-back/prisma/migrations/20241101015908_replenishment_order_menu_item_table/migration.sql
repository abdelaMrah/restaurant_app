-- DropForeignKey
ALTER TABLE "ReplenishmentOrder" DROP CONSTRAINT "ReplenishmentOrder_menuItemId_fkey";

-- CreateTable
CREATE TABLE "ReplenishmentOrderMenuItem" (
    "id" SERIAL NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "replenishmentOrderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ReplenishmentOrderMenuItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReplenishmentOrderMenuItem" ADD CONSTRAINT "ReplenishmentOrderMenuItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplenishmentOrderMenuItem" ADD CONSTRAINT "ReplenishmentOrderMenuItem_replenishmentOrderId_fkey" FOREIGN KEY ("replenishmentOrderId") REFERENCES "ReplenishmentOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
