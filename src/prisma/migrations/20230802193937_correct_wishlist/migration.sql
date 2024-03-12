/*
  Warnings:

  - You are about to drop the `_UserCardToWishList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserCardToWishList" DROP CONSTRAINT "_UserCardToWishList_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserCardToWishList" DROP CONSTRAINT "_UserCardToWishList_B_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "wishListId" INTEGER;

-- DropTable
DROP TABLE "_UserCardToWishList";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_wishListId_fkey" FOREIGN KEY ("wishListId") REFERENCES "WishList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
