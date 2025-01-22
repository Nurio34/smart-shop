"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const markNotificationsAsSeen = async () => {
  const user = await currentUser();

  if (!user) return redirect("/home");

  try {
    await prisma.notification.updateMany({
      where: { recieverId: user.id },
      data: { seen: true },
    });
    revalidateTag("notifications");
  } catch (error) {
    console.log(error);
  }
};
