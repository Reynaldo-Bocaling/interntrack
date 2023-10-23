/*
  Warnings:

  - You are about to drop the column `company_id` on the `trainer` table. All the data in the column will be lost.
  - Added the required column `areaAssign_id` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `trainer` DROP FOREIGN KEY `Trainer_company_id_fkey`;

-- AlterTable
ALTER TABLE `trainer` DROP COLUMN `company_id`,
    ADD COLUMN `areaAssign_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Trainer` ADD CONSTRAINT `Trainer_areaAssign_id_fkey` FOREIGN KEY (`areaAssign_id`) REFERENCES `AreaOfAssignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
