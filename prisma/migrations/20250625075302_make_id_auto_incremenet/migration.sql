-- AlterTable
CREATE SEQUENCE books_id_seq;
ALTER TABLE "books" ALTER COLUMN "id" SET DEFAULT nextval('books_id_seq');
ALTER SEQUENCE books_id_seq OWNED BY "books"."id";
