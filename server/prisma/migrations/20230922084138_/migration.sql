/*
  Warnings:

  - A unique constraint covering the columns `[coordinator_id]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `teacher` DROP FOREIGN KEY `Teacher_coordinator_id_fkey`;

-- AlterTable
ALTER TABLE `teacher` MODIFY `adress` VARCHAR(191) NULL,
    MODIFY `contact` INTEGER NULL,
    MODIFY `coordinator_id` INTEGER NULL,
    MODIFY `createAt` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `middlename` VARCHAR(191) NULL,
    MODIFY `specialization` VARCHAR(191) NULL,
    MODIFY `status` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Teacher_coordinator_id_key` ON `Teacher`(`coordinator_id`);

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_coordinator_id_fkey` FOREIGN KEY (`coordinator_id`) REFERENCES `Coordinator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
