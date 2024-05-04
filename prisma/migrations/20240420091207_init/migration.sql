-- AlterTable
ALTER TABLE "Inquiry" ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT,
ADD COLUMN     "weight" TEXT NOT NULL DEFAULT '0';
