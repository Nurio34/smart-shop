import { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseMenuButton from "./CloseMenuButton";
import Navigation from "./Navigation";
import Label from "./Label";

function SideMenu({
  role,
  isOpen,
  setIsOpen,
}: {
  role: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          id="Sidemenu"
          className=" fixed z-10 top-0 right-0 min-h-screen bg-base-300 text-base-content py-[1vh] px-[2vw] rounded-tl-lg rounded-bl-lg
            grid gap-y-[1vh] grid-rows-[auto,auto,1fr]
          "
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
        >
          <CloseMenuButton setIsOpen={setIsOpen} />
          <Label role={role} />
          <Navigation role={role} />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
export default SideMenu;
