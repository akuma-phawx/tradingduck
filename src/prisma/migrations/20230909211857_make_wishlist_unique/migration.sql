/*
  Warnings:

  - The primary key for the `TradeBox` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TradeBox` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[wishListId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `WishList` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_TradeBoxToUserCard" DROP CONSTRAINT "_TradeBoxToUserCard_A_fkey";

-- AlterTable
ALTER TABLE "TradeBox" DROP CONSTRAINT "TradeBox_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TradeBox_pkey" PRIMARY KEY ("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_wishListId_key" ON "User"("wishListId");

-- CreateIndex
CREATE UNIQUE INDEX "WishList_userId_key" ON "WishList"("userId");

-- AddForeignKey
ALTER TABLE "_TradeBoxToUserCard" ADD CONSTRAINT "_TradeBoxToUserCard_A_fkey" FOREIGN KEY ("A") REFERENCES "TradeBox"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
