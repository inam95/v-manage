/*
  Warnings:

  - You are about to drop the column `endTime` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "endTime",
DROP COLUMN "startTime";
