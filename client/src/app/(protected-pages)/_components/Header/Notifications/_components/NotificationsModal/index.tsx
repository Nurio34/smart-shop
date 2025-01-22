import { Notification } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function NotificationsModal({
  notifications,
  isOpen,
}: {
  notifications: Notification[];
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: "0", opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: "0", opacity: 0 }}
          className=" absolute z-10 right-0 w-96 max-h-96 overflow-y-auto bg-base-300 text-base-content rounded-lg shadow-md py-[1vh] px-[1vw]"
          style={{ scrollbarWidth: "thin" }}
        >
          {notifications.length === 0 ? (
            <p>There is not a notification yet ..</p>
          ) : (
            <ul className=" grid gap-y-[1vh]">
              {notifications.map((notif) => (
                <li key={notif.id}>
                  <Link
                    href={"/orders"}
                    className={`grid py-[1vh] px-[1vw] rounded-md ${
                      !notif.seen ? "bg-secondary/10" : "bg-base-100"
                    }`}
                  >
                    <p>{notif.message}</p>
                    <div className=" justify-self-end flex">
                      <p>{new Date(notif.createdAt).toLocaleDateString()}</p>
                      {"   - "}
                      {new Date(notif.createdAt).toLocaleTimeString()}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default NotificationsModal;
