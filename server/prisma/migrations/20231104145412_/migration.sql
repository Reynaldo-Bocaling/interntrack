/*
  Warnings:

  - You are about to drop the column `role` on the `announcement` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `role`,
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NULL,
    ADD COLUMN `to` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;
