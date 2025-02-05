"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";
import { FaCubesStacked } from "react-icons/fa6";
import { LiaJediOrder } from "react-icons/lia";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { TbHomeFilled } from "react-icons/tb";
import { MdContactSupport, MdTravelExplore } from "react-icons/md";
import { HiMiniShoppingCart } from "react-icons/hi2";

function Navigation({ role }: { role: string }) {
  const userNavigation = [
    {
      name: "becomeSeller",
      href: "/become-seller",
      icon: "",
    },
    {
      name: "home",
      href: "/home",
      icon: <TbHomeFilled size={24} />,
    },
    {
      name: "explore",
      href: "/explore",
      icon: <MdTravelExplore size={24} />,
    },
    {
      name: "cart",
      href: "/cart",
      icon: <HiMiniShoppingCart size={24} />,
    },
    {
      name: "orders",
      href: "/orders",
      icon: <LiaJediOrder size={24} />,
    },
    {
      name: "profile",
      href: "/profile",
      icon: <GiPlagueDoctorProfile size={24} />,
    },
    {
      name: "support",
      href: "/support",
      icon: <MdContactSupport size={24} />,
    },
  ];

  const sellerNavigation = [
    {
      name: "home",
      href: "/home",
      icon: <TbHomeFilled size={24} />,
    },
    {
      name: "dashboard",
      href: "/dashboard",
      icon: <RiDashboardFill size={24} />,
    },
    {
      name: "products",
      href: "/products",
      icon: <FaCubesStacked size={24} />,
    },
    {
      name: "orders",
      href: "/orders",
      icon: <LiaJediOrder size={24} />,
    },
    {
      name: "profile",
      href: "/profile",
      icon: <GiPlagueDoctorProfile size={24} />,
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
                className={`btn btn-sm w-full capitalize flex items-center justify-start gap-[0.5vw] ${
                  path === item.href ? "btn-secondary" : ""
                } ${
                  item.name === "becomeSeller" ? "btn-accent md:hidden" : ""
                }`}
                href={item.href}
              >
                {item.icon}
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
                className={`btn btn-sm w-full capitalize flex items-center justify-start gap-[0.5vw] ${
                  path === item.href ? "btn-secondary" : ""
                }`}
                href={item.href}
              >
                {item.icon}
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
                  path === item.href ? "btn-secondary" : ""
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
