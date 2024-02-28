/*
  Warnings:

  - The primary key for the `Interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `dealId` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Interest` table. All the data in the column will be lost.
  - Changed the type of `userId` on the `Interest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_dealId_fkey";

-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_userId_fkey";

-- DropIndex
DROP INDEX "Interest_userId_dealId_key";

-- AlterTable
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "dealId",
DROP COLUMN "id",
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Interest_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "InterestedDeal" (
    "id" SERIAL NOT NULL,
    "interestId" INTEGER NOT NULL,
    "dealId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterestedDeal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterestedDeal_interestId_dealId_key" ON "InterestedDeal"("interestId", "dealId");

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestedDeal" ADD CONSTRAINT "InterestedDeal_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestedDeal" ADD CONSTRAINT "InterestedDeal_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
