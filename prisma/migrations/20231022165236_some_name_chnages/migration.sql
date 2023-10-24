/*
  Warnings:

  - You are about to drop the column `driverId` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vin` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "driverId",
ADD COLUMN     "employeeId" TEXT;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "driverId",
DROP COLUMN "vehicleId",
ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "vin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vin_fkey" FOREIGN KEY ("vin") REFERENCES "Vehicle"("vin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Driver"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Driver"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;
