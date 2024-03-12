/*
  Warnings:

  - You are about to drop the column `language` on the `UserCard` table. All the data in the column will be lost.
  - Added the required column `languageCode` to the `UserCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCard" DROP COLUMN "language",
ADD COLUMN     "languageCode" TEXT NOT NULL;

-- DropEnum
DROP TYPE "CardLanguage";

-- CreateTable
CREATE TABLE "Language" (
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
