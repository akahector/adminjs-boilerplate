/*
  Warnings:

  - You are about to drop the column `imageId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_imageId_fkey";

-- DropIndex
DROP INDEX "Product_imageId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageId",
ADD COLUMN     "image" TEXT;
