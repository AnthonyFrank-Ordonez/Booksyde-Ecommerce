/*
  Warnings:

  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_bookId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_bookId_fkey";

-- AlterTable
ALTER TABLE "books" DROP CONSTRAINT "books_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "books_id_seq";

-- AlterTable
ALTER TABLE "cart_items" ALTER COLUMN "bookId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "bookId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
