-- CreateTable
CREATE TABLE "orders_summary_by_hour" (
    "hour" INTEGER NOT NULL,
    "total_orders" INTEGER NOT NULL,
    "total_menu_items" INTEGER NOT NULL,
    "total_revenue" DOUBLE PRECISION NOT NULL
);
