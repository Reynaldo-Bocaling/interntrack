/*
  Warnings:

  - Made the column `deletedStatus` on table `student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `student` MODIFY `deletedStatus` INTEGER NOT NULL;
