-- CreateTable
CREATE TABLE "User2" (
    "name" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_name_fkey" FOREIGN KEY ("name") REFERENCES "User2"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
