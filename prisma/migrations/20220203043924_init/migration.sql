-- CreateTable
CREATE TABLE "UsersMonetaryInfo" (
    "id" TEXT NOT NULL,

    CONSTRAINT "UsersMonetaryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
