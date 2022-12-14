/*
  Warnings:

  - You are about to alter the column `temp` on the `CovidCheckin` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `CovidCheckin` MODIFY `temp` DOUBLE NOT NULL;
