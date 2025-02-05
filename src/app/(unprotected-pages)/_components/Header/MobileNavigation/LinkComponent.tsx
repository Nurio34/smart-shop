"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SetStateAction } from "react";
import { Dispatch } from "react";

function LinkComponent({
  href,
  label,
  setIsOpen,
}: {
  href: string;
  label: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const path = usePathname();

  const isActive = path === href;
  return (
    <Link
      href={href}
      className={`btn-ghost ${isActive ? " btn-link font-semibold" : ""}`}
      onClick={() => setIsOpen(false)}
    >
      {label}
    </Link>
  );
}
export default LinkComponent;
