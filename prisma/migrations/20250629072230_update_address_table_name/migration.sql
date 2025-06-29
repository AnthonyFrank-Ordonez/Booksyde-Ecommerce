/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropTable
DROP TABLE "Address";

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "houseNo" INTEGER NOT NULL,
    "City" TEXT NOT NULL,
    "Province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "Postal" INTEGER NOT NULL,
    "defaultAddress" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
