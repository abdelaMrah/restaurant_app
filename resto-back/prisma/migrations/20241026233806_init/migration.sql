-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photoUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
