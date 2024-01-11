-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
