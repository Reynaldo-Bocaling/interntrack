/*
  Warnings:

  - Added the required column `week` to the `Timesheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timesheet` ADD COLUMN `week` INTEGER NOT NULL;
