/*
  Warnings:

  - Added the required column `logStatus` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timesheet` ADD COLUMN `logStatus` INTEGER NOT NULL;
