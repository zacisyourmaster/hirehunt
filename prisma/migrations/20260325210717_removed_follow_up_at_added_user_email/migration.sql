/*
  Warnings:

  - You are about to drop the column `followUpAt` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "followUpAt",
ADD COLUMN     "userEmail" TEXT;
