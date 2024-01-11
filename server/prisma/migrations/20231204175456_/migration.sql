/*
  Warnings:

  - You are about to drop the column `createdRole` on the `announcement` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `announcement` table. All the data in the column will be lost.
  - Added the required column `from` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `announcement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `announcement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `createdRole`,
    DROP COLUMN `to`,
    ADD COLUMN `from` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_id` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
