-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userClerkId_fkey" FOREIGN KEY ("userClerkId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
