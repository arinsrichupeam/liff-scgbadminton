-- AlterTable
ALTER TABLE `CovidCheckin` ADD COLUMN `midifyby` VARCHAR(191) NULL,
    ADD COLUMN `modifydate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `createdate` DATETIME(3) NOT NULL,
    ADD COLUMN `modifydate` DATETIME(3) NULL;
