/*
  Warnings:

  - Added the required column `recieverId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `sellerId` on table `OrderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_sellerId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "recieverId" TEXT NOT NULL,
ALTER COLUMN "sellerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
