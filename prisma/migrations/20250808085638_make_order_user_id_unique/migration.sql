/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "public"."orders"("userId");
