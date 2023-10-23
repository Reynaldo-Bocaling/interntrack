/*
  Warnings:

  - You are about to drop the column `taskName` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `taskName`,
    ADD COLUMN `tasImageUrl` VARCHAR(191) NULL,
    ADD COLUMN `taskImage` VARCHAR(191) NULL;
