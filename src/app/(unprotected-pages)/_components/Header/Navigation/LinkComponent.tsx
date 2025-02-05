"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LinkComponent({ href, label }: { href: string; label: string }) {
  const path = usePathname();

  const isActive = path === href;
  return (
    <Link
      href={href}
      className={`btn-ghost ${isActive ? " btn-link font-semibold" : ""}`}
    >
      {label}
    </Link>
  );
}
export default LinkComponent;
