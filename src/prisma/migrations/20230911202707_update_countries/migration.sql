/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Country` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_countryId_fkey";

-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("shortName");

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "countryId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("shortName") ON DELETE SET NULL ON UPDATE CASCADE;
