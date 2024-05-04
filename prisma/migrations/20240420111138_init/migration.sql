/*
  Warnings:

  - You are about to drop the `_ProductGallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductGallery" DROP CONSTRAINT "_ProductGallery_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductGallery" DROP CONSTRAINT "_ProductGallery_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gallery" JSONB;

-- DropTable
DROP TABLE "_ProductGallery";
