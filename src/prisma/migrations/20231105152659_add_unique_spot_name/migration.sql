/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Tradespot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tradespot_name_key" ON "Tradespot"("name");
