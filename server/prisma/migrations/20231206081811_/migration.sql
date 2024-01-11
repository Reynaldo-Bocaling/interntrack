/*
  Warnings:

  - You are about to drop the column `students` on the `announcement` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `students`,
    ADD COLUMN `student_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
