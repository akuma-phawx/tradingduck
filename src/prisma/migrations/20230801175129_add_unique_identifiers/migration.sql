/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Set` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_identifier_key" ON "Card"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Set_identifier_key" ON "Set"("identifier");
