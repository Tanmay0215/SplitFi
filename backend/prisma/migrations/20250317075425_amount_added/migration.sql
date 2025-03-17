/*
  Warnings:

  - A unique constraint covering the columns `[ensName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ensName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ensName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_ensName_key" ON "User"("ensName");
