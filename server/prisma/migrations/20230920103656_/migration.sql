/*
  Warnings:

  - You are about to drop the column `adress` on the `trainer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `trainer` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    MODIFY `contact` INTEGER NULL,
    MODIFY `createAt` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `middlename` VARCHAR(191) NULL,
    MODIFY `status` INTEGER NULL;
