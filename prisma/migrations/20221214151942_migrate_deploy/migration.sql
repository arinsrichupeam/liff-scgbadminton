-- CreateTable
CREATE TABLE `CovidCheckin` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `temp` INTEGER NOT NULL,
    `cordNumber` INTEGER NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `checkinTime` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CovidCheckin` ADD CONSTRAINT `CovidCheckin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
