/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Card` table. All the data in the column will be lost.
  - The primary key for the `Set` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Set` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_setId_fkey";

-- DropForeignKey
ALTER TABLE "UserCard" DROP CONSTRAINT "UserCard_cardId_fkey";

-- DropIndex
DROP INDEX "Card_identifier_key";

-- DropIndex
DROP INDEX "Set_identifier_key";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "id",
ALTER COLUMN "setId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("identifier");

-- AlterTable
ALTER TABLE "Set" DROP CONSTRAINT "Set_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Set_pkey" PRIMARY KEY ("identifier");

-- AlterTable
ALTER TABLE "UserCard" ALTER COLUMN "cardId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
