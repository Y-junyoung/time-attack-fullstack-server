/*
  Warnings:

  - The primary key for the `Interest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `interestId` on the `InterestedDeal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,dealId]` on the table `InterestedDeal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `InterestedDeal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_userId_fkey";

-- DropForeignKey
ALTER TABLE "InterestedDeal" DROP CONSTRAINT "InterestedDeal_interestId_fkey";

-- DropIndex
DROP INDEX "InterestedDeal_interestId_dealId_key";

-- AlterTable
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Interest_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "InterestedDeal" DROP COLUMN "interestId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InterestedDeal_userId_dealId_key" ON "InterestedDeal"("userId", "dealId");

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestedDeal" ADD CONSTRAINT "InterestedDeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Interest"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
