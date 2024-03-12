/*
  Warnings:

  - You are about to drop the column `rarity` on the `Card` table. All the data in the column will be lost.
  - Added the required column `rarityName` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "rarity",
ADD COLUMN     "rarityName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Rarity" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Rarity_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_rarityName_fkey" FOREIGN KEY ("rarityName") REFERENCES "Rarity"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
