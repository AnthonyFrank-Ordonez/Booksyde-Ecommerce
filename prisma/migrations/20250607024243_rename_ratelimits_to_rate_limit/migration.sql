/*
  Warnings:

  - You are about to drop the `rateLimits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "rateLimits";

-- CreateTable
CREATE TABLE "rateLimit" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "count" INTEGER,
    "lastRequest" BIGINT,

    CONSTRAINT "rateLimit_pkey" PRIMARY KEY ("id")
);
