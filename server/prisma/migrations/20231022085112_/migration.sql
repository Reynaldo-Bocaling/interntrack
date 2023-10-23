/*
  Warnings:

  - You are about to drop the column `brgyImageUrl` on the `requirement` table. All the data in the column will be lost.
  - You are about to drop the column `nsoImageUrl` on the `requirement` table. All the data in the column will be lost.
  - You are about to drop the column `philhealthImageUrl` on the `requirement` table. All the data in the column will be lost.
  - Added the required column `image` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requirement` DROP COLUMN `brgyImageUrl`,
    DROP COLUMN `nsoImageUrl`,
    DROP COLUMN `philhealthImageUrl`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
