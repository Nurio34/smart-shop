"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation({ role }: { role: string }) {
  const userNavigation = [
    {
      name: "home",
      href: "/home",
      icon: "",
    },
    {
      name: "explore",
      href: "/explore",
      icon: "",
    },
    {
      name: "cart",
      href: "/cart",
      icon: "",
    },
    {
      name: "orders",
      href: "/orders",
      icon: "",
    },
    {
      name: "profile",
      href: "/profile",
      icon: "",
    },
    {
      name: "support",
      href: "/support",
      icon: "",
    },
  ];

  const sellerNavigation = [
    {
      name: "dashboard",
      href: "/dashboard",
      icon: "",
    },
    {
      name: "products",
      href: "/products",
      icon: "",
    },
    {
      name: "orders",
      href: "/orders",
      icon: "",
    },
    {
      name: "analytics",
      href: "/analytics",
      icon: "",
    },
    {
      name: "profile",
      href: "/profile",
      icon: "",
    },
  ];

  const adminNavigation = [
    {
      name: "dashboard",
      href: "/dashboard",
      icon: "",
    },
    {
      name: "users",
      href: "/users",
      icon: "",
    },
    {
      name: "products",
      href: "/products",
      icon: "",
    },
    {
      name: "orders",
      href: "/orders",
      icon: "",
    },
    {
      name: "system",
      href: "/system",
      icon: "",
    },
  ];

  const path = usePathname();

  return (
    <>
      {role === "USER" ? (
        <ul className="flex flex-col gap-y-[1vh]">
          {userNavigation.map((item) => (
            <li key={item.name}>
              <Link
                className={`btn btn-sm w-full capitalize ${
                  path === item.href ? "btn-accent" : ""
                }`}
                href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : role === "SELLER" ? (
        <ul className="flex flex-col gap-y-[1vh]">
          {sellerNavigation.map((item) => (
            <li key={item.name}>
              <Link
                className={`btn btn-sm w-full capitalize ${
                  path === item.href ? "btn-accent" : ""
                }`}
                href={item.href}
              >
                {item.name}
              </Link>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-y-[1vh]">
          {adminNavigation.map((item) => (
            <li key={item.name}>
              <Link
                className={`btn btn-sm w-full capitalize ${
                  path === item.href ? "btn-accent" : ""
                }`}
                href={item.href}
              >
                {item.name}
              </Link>{" "}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default Navigation;
