/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `logo` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `shortName` on the `Country` table. All the data in the column will be lost.
  - Added the required column `capital` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `continent` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iso` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Tradespot" DROP CONSTRAINT "Tradespot_countryShortName_fkey";

-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_countryId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "logo",
DROP COLUMN "shortName",
ADD COLUMN     "capital" TEXT NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "continent" TEXT NOT NULL,
ADD COLUMN     "iso" BOOLEAN NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tradespot" ADD CONSTRAINT "Tradespot_countryShortName_fkey" FOREIGN KEY ("countryShortName") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
