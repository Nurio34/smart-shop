"use client";

import { useEffect, useState } from "react";
import SideMenu from "./_components/SideMenu";
import ToggleButton from "./_components/ToggleButton";
import { usePathname } from "next/navigation";

function SideMenuContainerClient({ role }: { role: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <ToggleButton setIsOpen={setIsOpen} />
      <SideMenu role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
export default SideMenuContainerClient;
