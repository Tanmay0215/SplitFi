/*
  Warnings:

  - You are about to drop the `User2` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userName` to the `Payout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_name_fkey";

-- AlterTable
ALTER TABLE "Payout" ADD COLUMN     "userName" TEXT NOT NULL;

-- DropTable
DROP TABLE "User2";

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
