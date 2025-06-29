/*
  Warnings:

  - You are about to drop the column `City` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `Postal` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `Province` on the `address` table. All the data in the column will be lost.
  - Added the required column `city` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "City",
DROP COLUMN "Postal",
DROP COLUMN "Province",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "postal" INTEGER NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL;
