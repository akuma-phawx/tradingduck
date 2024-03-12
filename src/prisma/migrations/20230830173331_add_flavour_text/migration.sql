/*
  Warnings:

  - Added the required column `flavorText` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "flavorText" TEXT NOT NULL;
