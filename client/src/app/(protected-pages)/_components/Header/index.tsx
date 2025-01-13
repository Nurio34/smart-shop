import Logo from "@/app/_globalComponents/Logo";
import Auth from "@/app/_globalComponents/Auth";
import BecomeSeller from "./BecomeSeller";

function Header() {
  return (
    <header className="flex gap-x-[2vw] justify-between items-center  pr-[1vw] border-b border-base-content">
      <Logo />
      <BecomeSeller />
      <Auth />
    </header>
  );
}
export default Header;
