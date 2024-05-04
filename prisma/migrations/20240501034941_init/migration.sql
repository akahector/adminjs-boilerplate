/*
  Warnings:

  - You are about to drop the `IFile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "price" TEXT NOT NULL DEFAULT '0';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "whatsapp" TEXT;

-- DropTable
DROP TABLE "IFile";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");
