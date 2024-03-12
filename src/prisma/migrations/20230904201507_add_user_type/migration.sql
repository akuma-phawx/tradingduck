-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'ADMIN', 'STORE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'USER';
