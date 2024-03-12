-- DropForeignKey
ALTER TABLE "WishList" DROP CONSTRAINT "WishList_userId_fkey";

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
