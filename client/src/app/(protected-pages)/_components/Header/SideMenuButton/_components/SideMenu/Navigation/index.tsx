import Link from "next/link";

function Navigation({ role }: { role: string }) {
  console.log({ role });
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
    {
      name: "faq",
      href: "/faq",
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

  return (
    <>
      {role === "USER" ? (
        <ul className="flex flex-col gap-y-[1vh]">
          {userNavigation.map((item) => (
            <li key={item.name}>
              <Link className="btn btn-sm w-full capitalize" href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : role === "SELLER" ? (
        <ul className="flex flex-col gap-y-[1vh]">
          {sellerNavigation.map((item) => (
            <li key={item.name}>
              <Link className="btn btn-sm w-full capitalize" href={item.href}>
                {item.name}
              </Link>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-y-[1vh]">
          {adminNavigation.map((item) => (
            <li key={item.name}>
              <Link className="btn btn-sm w-full capitalize" href={item.href}>
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
