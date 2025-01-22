import { markNotificationsAsSeen } from "@/actions/notifications/markNotificationsAsSeen";
import { SetStateAction, useEffect, useState } from "react";
import { Dispatch } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";

function NotificationsButton({
  newNotificationsAmount,
  setIsOpen,
  isOpen,
}: {
  newNotificationsAmount: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const isAnyNewNotifications = newNotificationsAmount > 0;

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpened(true);
    }

    if (isOpened && !isOpen) {
      const markNotificationsAsSeenAction = async () => {
        try {
          await markNotificationsAsSeen();
        } catch (error) {
          console.log(error);
        }
      };

      markNotificationsAsSeenAction();
    }
  }, [isOpen]);

  return (
    <div className=" relative">
      <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <MdOutlineNotificationsNone size={28} />
      </button>
      {isAnyNewNotifications && (
        <div
          className=" absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 rounded-full bg-warning w-6 aspect-square
        flex justify-center items-center text-sm
      "
        >
          {newNotificationsAmount}
        </div>
      )}
    </div>
  );
}
export default NotificationsButton;
