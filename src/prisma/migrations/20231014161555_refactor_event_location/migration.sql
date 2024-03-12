/*
  Warnings:

  - You are about to drop the column `location` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "location",
ADD COLUMN     "countryId" TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("code") ON DELETE SET NULL ON UPDATE CASCADE;
