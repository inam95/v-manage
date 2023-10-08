/*
  Warnings:

  - Changed the type of `insProvider` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InsuranceProviders" AS ENUM ('CEYLINCO', 'ALLIANZ', 'SLI', 'UNION', 'JANASHAKTHI', 'AIA', 'LOLC');

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "insProvider",
ADD COLUMN     "insProvider" "InsuranceProviders" NOT NULL;
