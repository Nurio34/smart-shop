import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BotServer from "./Server";

async function Bot() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { history: true },
  });

  if (!user) return redirect("/home");

  const role = user.role;

  return <>{role === "USER" ? <BotServer user={user} /> : null}</>;
}
export default Bot;
