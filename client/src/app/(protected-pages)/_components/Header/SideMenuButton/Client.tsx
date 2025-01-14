"use client";

import { useState } from "react";
import SideMenu from "./_components/SideMenu";
import ToggleButton from "./_components/ToggleButton";

function SideMenuContainerClient({ role }: { role: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToggleButton setIsOpen={setIsOpen} />
      <SideMenu role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
export default SideMenuContainerClient;
