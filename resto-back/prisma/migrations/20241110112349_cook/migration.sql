-- CreateTable
CREATE TABLE "OrderItemCook" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "cookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrderItemCook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cook" (
    "id" SERIAL NOT NULL,
    "employeId" INTEGER NOT NULL,
    "specialties" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Cook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItemCook_orderItemId_cookId_key" ON "OrderItemCook"("orderItemId", "cookId");

-- CreateIndex
CREATE UNIQUE INDEX "Cook_employeId_key" ON "Cook"("employeId");

-- AddForeignKey
ALTER TABLE "OrderItemCook" ADD CONSTRAINT "OrderItemCook_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItemCook" ADD CONSTRAINT "OrderItemCook_cookId_fkey" FOREIGN KEY ("cookId") REFERENCES "Cook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cook" ADD CONSTRAINT "Cook_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
