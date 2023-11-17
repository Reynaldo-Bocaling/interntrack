/*
  Warnings:

  - You are about to drop the column `director_id` on the `coordinator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `coordinator` DROP FOREIGN KEY `Coordinator_director_id_fkey`;

-- AlterTable
ALTER TABLE `coordinator` DROP COLUMN `director_id`;
