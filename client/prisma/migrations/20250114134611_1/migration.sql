/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellerClerkId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `thumbnail` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SELLER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sellerId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sellerId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sellerClerkId" TEXT NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sellerClerkId_fkey" FOREIGN KEY ("sellerClerkId") REFERENCES "Seller"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
