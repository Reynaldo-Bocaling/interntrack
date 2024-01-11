/*
  Warnings:

  - You are about to drop the column `student_id` on the `announcement` table. All the data in the column will be lost.
  - Added the required column `students` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `announcement` DROP FOREIGN KEY `Announcement_student_id_fkey`;

-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `student_id`,
    ADD COLUMN `students` VARCHAR(191) NOT NULL;
