import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import UserProfile from "./UserProfile";
import SellerProfile from "./SellerProfile";

async function ProfilePage() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { seller: true },
  });

  if (!user) return redirect("/home");

  const role = user.role;

  if (role === "ADMIN") return redirect("/home");

  return (
    <>
      {role === "USER" ? (
        <UserProfile user={user} />
      ) : (
        <SellerProfile user={user} />
      )}
    </>
  );
}
export default ProfilePage;
