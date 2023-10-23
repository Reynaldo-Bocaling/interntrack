-- CreateTable
CREATE TABLE `Requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brgyImageUrl` VARCHAR(191) NULL,
    `philhealthImageUrl` VARCHAR(191) NULL,
    `nsoImageUrl` VARCHAR(191) NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
