-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_areaAssigned_id_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_teacher_id_fkey`;

-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_trainer_id_fkey`;

-- AlterTable
ALTER TABLE `student` MODIFY `areaAssigned_id` INTEGER NULL,
    MODIFY `teacher_id` INTEGER NULL,
    MODIFY `trainer_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_trainer_id_fkey` FOREIGN KEY (`trainer_id`) REFERENCES `Trainer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_areaAssigned_id_fkey` FOREIGN KEY (`areaAssigned_id`) REFERENCES `AreaOfAssignment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
