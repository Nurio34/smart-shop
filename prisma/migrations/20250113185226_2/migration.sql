/*
  Warnings:

  - You are about to drop the column `userId` on the `Seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_userId_fkey";

-- DropIndex
DROP INDEX "Seller_userId_key";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seller_clerkId_key" ON "Seller"("clerkId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
