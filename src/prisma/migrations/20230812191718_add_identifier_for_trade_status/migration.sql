/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `TradeStatus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `TradeStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TradeStatus" ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TradeStatus_identifier_key" ON "TradeStatus"("identifier");
