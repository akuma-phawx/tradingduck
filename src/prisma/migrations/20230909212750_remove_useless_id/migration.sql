/*
  Warnings:

  - You are about to drop the column `wishListId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_wishListId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "wishListId";
