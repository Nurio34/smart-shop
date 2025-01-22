import { prisma } from "@/lib/prisma";
import NotificationsClient from "./Client";

export const revalidate = 10;

async function NotificationsServer({ clerkId }: { clerkId: string }) {
  const notifications = await prisma.notification.findMany({
    where: { recieverId: clerkId },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <NotificationsClient notifications={notifications} />;
}
export default NotificationsServer;
