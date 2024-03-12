/*
  Warnings:

  - You are about to drop the column `banner` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `userImage` on the `Shop` table. All the data in the column will be lost.
  - Added the required column `description` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "banner",
DROP COLUMN "userImage",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "logo" TEXT;
