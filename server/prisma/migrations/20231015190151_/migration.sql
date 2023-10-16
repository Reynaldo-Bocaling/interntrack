/*
  Warnings:

  - You are about to alter the column `totalHours` on the `timesheet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `timesheet` MODIFY `totalHours` DOUBLE NOT NULL;
