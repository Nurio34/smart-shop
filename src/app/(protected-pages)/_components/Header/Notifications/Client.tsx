"use client";

import { Notification } from "@prisma/client";
import NotificationsButton from "./_components/NotificationsButton";
import NotificationsModal from "./_components/NotificationsModal";
import { useState } from "react";

function NotificationsClient({
  notifications,
}: {
  notifications: Notification[];
}) {
  const newNotificationsAmount = notifications.filter(
    (notif) => !notif.seen
  ).length;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <NotificationsButton
        newNotificationsAmount={newNotificationsAmount}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <NotificationsModal notifications={notifications} isOpen={isOpen} />
    </div>
  );
}
export default NotificationsClient;
