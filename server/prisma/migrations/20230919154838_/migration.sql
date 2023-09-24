/*
  Warnings:

  - Added the required column `company_id` to the `AreaOfAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `areaofassignment` ADD COLUMN `company_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `AreaOfAssignment` ADD CONSTRAINT `AreaOfAssignment_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
