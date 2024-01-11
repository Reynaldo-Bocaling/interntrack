/*
  Warnings:

  - You are about to drop the column `from` on the `announcement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `announcement` DROP FOREIGN KEY `Announcement_student_id_fkey`;

-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `from`,
    ADD COLUMN `coordinator_id` INTEGER NULL,
    ADD COLUMN `teacher_id` INTEGER NULL,
    ADD COLUMN `trainer_id` INTEGER NULL,
    MODIFY `student_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_coordinator_id_fkey` FOREIGN KEY (`coordinator_id`) REFERENCES `Coordinator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_trainer_id_fkey` FOREIGN KEY (`trainer_id`) REFERENCES `Trainer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
