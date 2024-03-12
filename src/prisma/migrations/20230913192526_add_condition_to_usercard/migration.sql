/*
  Warnings:

  - Added the required column `condition` to the `UserCard` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserCardCondition" AS ENUM ('MINT', 'NEAR_MINT', 'EXCELLENT', 'GOOD', 'LIGHT_PLAYED', 'PLAYED', 'POOR');

-- AlterTable
ALTER TABLE "UserCard" ADD COLUMN     "condition" "UserCardCondition" NOT NULL;
