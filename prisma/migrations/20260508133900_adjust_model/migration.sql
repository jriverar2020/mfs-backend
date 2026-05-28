/*
  Warnings:

  - You are about to drop the column `pone` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "pone",
ADD COLUMN     "phone" TEXT;
