/*
  Warnings:

  - You are about to alter the column `timeIn` on the `timesheet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `timeOut` on the `timesheet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `timesheet` MODIFY `timeIn` DATETIME(3) NOT NULL,
    MODIFY `timeOut` DATETIME(3) NOT NULL;
