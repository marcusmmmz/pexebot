/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersMonetaryInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "UsersMonetaryInfo";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
