/*
  Warnings:

  - Added the required column `postedBy` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `announcement` ADD COLUMN `postedBy` VARCHAR(191) NOT NULL;
