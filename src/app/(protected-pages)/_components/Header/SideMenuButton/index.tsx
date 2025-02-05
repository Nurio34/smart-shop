import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SideMenuContainerClient from "./Client";

async function SideMenuContainer() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    select: {
      role: true,
    },
  });

  if (!user) return redirect("/home");

  const role = user.role;

  return <SideMenuContainerClient role={role} />;
}

export default SideMenuContainer;
