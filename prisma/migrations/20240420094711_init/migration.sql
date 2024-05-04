-- CreateTable
CREATE TABLE "IFile" (
    "id" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "IFile_pkey" PRIMARY KEY ("id")
);
