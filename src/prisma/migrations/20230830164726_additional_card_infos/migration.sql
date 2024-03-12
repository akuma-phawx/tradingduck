/*
  Warnings:

  - Added the required column `artist` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "rarity" TEXT NOT NULL,
ADD COLUMN     "types" TEXT[];
