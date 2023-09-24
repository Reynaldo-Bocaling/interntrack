/*
  Warnings:

  - You are about to drop the column `company_id` on the `areaofassignment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `areaofassignment` DROP FOREIGN KEY `AreaOfAssignment_company_id_fkey`;

-- AlterTable
ALTER TABLE `areaofassignment` DROP COLUMN `company_id`,
    MODIFY `areaName` VARCHAR(191) NULL,
    MODIFY `slot` INTEGER NULL,
    MODIFY `createAt` VARCHAR(191) NULL;
