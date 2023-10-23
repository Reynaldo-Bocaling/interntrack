-- AlterTable
ALTER TABLE `coordinator` ADD COLUMN `profile_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `director` ADD COLUMN `profile_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `profile_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `trainer` ADD COLUMN `profile_url` VARCHAR(191) NULL;
