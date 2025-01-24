"use client";

import { TfiMenu } from "react-icons/tfi";
import { GrFormClose } from "react-icons/gr";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LinkComponent from "./LinkComponent";

function MobileNavigation() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" relative md:hidden">
      <button
        type="button"
        className="btn btn-sm btn-ghost"
        onClick={() => setIsOpen(true)}
      >
        <TfiMenu size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className=" fixed top-0 right-0 bg-base-100 h-screen z-10 py-[2vw]"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1, transition: { type: "tween" } }}
            exit={{ x: "100%", opacity: 0 }}
          >
            <div className=" flex justify-end">
              <button
                type="button"
                className="btn btn-xs btn-error btn-circle"
                onClick={() => setIsOpen(false)}
              >
                <GrFormClose size={24} />
              </button>
            </div>
            <ul className="grid gap-y-[1vh] pl-[2vw] pr-[4vw] py-[1vh] ">
              {navItems.map((item) => (
                <LinkComponent
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  setIsOpen={setIsOpen}
                />
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
export default MobileNavigation;
