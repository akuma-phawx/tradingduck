/*
  Warnings:

  - The primary key for the `TradeBox` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_TradeBoxToUserCard" DROP CONSTRAINT "_TradeBoxToUserCard_A_fkey";

-- AlterTable
ALTER TABLE "TradeBox" DROP CONSTRAINT "TradeBox_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TradeBox_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_TradeBoxToUserCard" ADD CONSTRAINT "_TradeBoxToUserCard_A_fkey" FOREIGN KEY ("A") REFERENCES "TradeBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;
