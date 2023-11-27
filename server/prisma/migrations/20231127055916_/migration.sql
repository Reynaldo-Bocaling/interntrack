-- AlterTable
ALTER TABLE `timesheet` ADD COLUMN `studentMark` INTEGER NULL,
    ADD COLUMN `teacherMark` INTEGER NULL;

-- CreateTable
CREATE TABLE `WeeklyReport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeeklyReport` ADD CONSTRAINT `WeeklyReport_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
