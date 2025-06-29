-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "houseNo" INTEGER NOT NULL,
    "City" TEXT NOT NULL,
    "Province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "Postal" INTEGER NOT NULL,
    "defaultAddress" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
