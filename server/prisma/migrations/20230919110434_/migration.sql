/*
  Warnings:

  - You are about to drop the column `name` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teacher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `trainer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[areaAssigned_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trainer_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacher_id]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adress` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Director` table without a default value. This is not possible if the table is not empty.
  - Added the required column `areaAssigned_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinator_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialization` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createAt` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Trainer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coordinator` ADD COLUMN `adress` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact` INTEGER NOT NULL,
    ADD COLUMN `createAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `director` ADD COLUMN `adress` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact` INTEGER NOT NULL,
    ADD COLUMN `createAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `name`,
    ADD COLUMN `adress` VARCHAR(191) NULL,
    ADD COLUMN `areaAssigned_id` INTEGER NOT NULL,
    ADD COLUMN `contact` INTEGER NULL,
    ADD COLUMN `course` VARCHAR(191) NULL,
    ADD COLUMN `createAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `firstname` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `lastname` VARCHAR(191) NULL,
    ADD COLUMN `middlename` VARCHAR(191) NULL,
    ADD COLUMN `status` INTEGER NULL,
    ADD COLUMN `teacher_id` INTEGER NOT NULL,
    ADD COLUMN `trainer_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `teacher` DROP COLUMN `name`,
    ADD COLUMN `adress` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact` INTEGER NOT NULL,
    ADD COLUMN `coordinator_id` INTEGER NOT NULL,
    ADD COLUMN `createAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NOT NULL,
    ADD COLUMN `specialization` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trainer` DROP COLUMN `name`,
    ADD COLUMN `adress` VARCHAR(191) NOT NULL,
    ADD COLUMN `company_id` INTEGER NOT NULL,
    ADD COLUMN `contact` INTEGER NOT NULL,
    ADD COLUMN `createAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `middlename` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Timesheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timeIn` VARCHAR(191) NOT NULL,
    `timeOut` VARCHAR(191) NOT NULL,
    `totalHours` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createAt` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `createAt` VARCHAR(191) NOT NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `contact` INTEGER NULL,
    `moaUpload` VARCHAR(191) NULL,
    `createAt` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaOfAssignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `areaName` VARCHAR(191) NOT NULL,
    `slot` INTEGER NOT NULL,
    `createAt` VARCHAR(191) NOT NULL,
    `company_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Student_areaAssigned_id_key` ON `Student`(`areaAssigned_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_trainer_id_key` ON `Student`(`trainer_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_teacher_id_key` ON `Student`(`teacher_id`);

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_coordinator_id_fkey` FOREIGN KEY (`coordinator_id`) REFERENCES `Coordinator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trainer` ADD CONSTRAINT `Trainer_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_trainer_id_fkey` FOREIGN KEY (`trainer_id`) REFERENCES `Trainer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_areaAssigned_id_fkey` FOREIGN KEY (`areaAssigned_id`) REFERENCES `AreaOfAssignment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timesheet` ADD CONSTRAINT `Timesheet_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AreaOfAssignment` ADD CONSTRAINT `AreaOfAssignment_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
