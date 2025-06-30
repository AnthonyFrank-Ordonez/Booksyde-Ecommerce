/*
  Warnings:

  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "street" TEXT NOT NULL;
