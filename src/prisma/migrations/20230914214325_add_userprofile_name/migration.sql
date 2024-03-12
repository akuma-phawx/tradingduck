/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `UserProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_name_key" ON "UserProfile"("name");
