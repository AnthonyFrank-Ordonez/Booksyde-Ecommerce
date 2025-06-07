-- CreateTable
CREATE TABLE "rateLimits" (
    "id" TEXT NOT NULL,
    "key" TEXT,
    "count" INTEGER,
    "lastRequest" BIGINT,

    CONSTRAINT "rateLimits_pkey" PRIMARY KEY ("id")
);
