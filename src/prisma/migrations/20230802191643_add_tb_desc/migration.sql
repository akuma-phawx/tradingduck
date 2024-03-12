/*
  Warnings:

  - Added the required column `description` to the `TradeBox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TradeBox" ADD COLUMN     "description" TEXT NOT NULL;
