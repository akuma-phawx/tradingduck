/*
  Warnings:

  - Added the required column `releaseDate` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "releaseDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "releaseDate" TEXT NOT NULL;
