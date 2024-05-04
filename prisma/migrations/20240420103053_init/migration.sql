/*
  Warnings:

  - You are about to drop the column `comment` on the `IFile` table. All the data in the column will be lost.
  - You are about to drop the column `mime` on the `IFile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IFile" DROP COLUMN "comment",
DROP COLUMN "mime",
ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "filePath" TEXT,
ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "size" TEXT,
ALTER COLUMN "s3Key" DROP NOT NULL,
ALTER COLUMN "bucket" DROP NOT NULL;
