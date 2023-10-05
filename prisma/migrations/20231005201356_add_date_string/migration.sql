/*
  Warnings:

  - Made the column `publicationDate` on table `books` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "books" ALTER COLUMN "publicationDate" SET NOT NULL,
ALTER COLUMN "publicationDate" SET DATA TYPE TEXT;
