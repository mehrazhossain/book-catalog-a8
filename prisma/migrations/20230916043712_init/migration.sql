/*
  Warnings:

  - You are about to drop the `ReviewAndRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordered-books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReviewAndRating" DROP CONSTRAINT "ReviewAndRating_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewAndRating" DROP CONSTRAINT "ReviewAndRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "ordered-books" DROP CONSTRAINT "ordered-books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ordered-books" DROP CONSTRAINT "ordered-books_orderId_fkey";

-- DropTable
DROP TABLE "ReviewAndRating";

-- DropTable
DROP TABLE "ordered-books";

-- CreateTable
CREATE TABLE "reviewAndRetings" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "reviewAndRetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderedBooks" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "orderedBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviewAndRetings" ADD CONSTRAINT "reviewAndRetings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviewAndRetings" ADD CONSTRAINT "reviewAndRetings_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderedBooks" ADD CONSTRAINT "orderedBooks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderedBooks" ADD CONSTRAINT "orderedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
