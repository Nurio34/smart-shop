import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NotificationsServer from "./Server";

async function Notifications() {
  const clerkUser = await currentUser();

  if (!clerkUser) return redirect("/home");

  const clerkId = clerkUser.id;

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) return redirect("/home");

  const role = user.role;

  return <NotificationsServer clerkId={clerkId} />;

  return (
    <>{role === "ADMIN" ? null : <NotificationsServer clerkId={clerkId} />}</>
  );
}
export default Notifications;
