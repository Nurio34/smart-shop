import LinkComponent from "./LinkComponent";

function Navigation() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <LinkComponent key={item.label} href={item.href} label={item.label} />
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
