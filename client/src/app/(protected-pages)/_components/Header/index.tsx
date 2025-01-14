import Logo from "@/app/_globalComponents/Logo";
import Auth from "@/app/_globalComponents/Auth";
import BecomeSeller from "./BecomeSeller";
import Navigation from "./Navigation";
import SideMenuButton from "./SideMenuButton";

function Header() {
  return (
    <header className="flex gap-x-[2vw] justify-between items-center  pr-[1vw] border-b border-base-content">
      <Logo />
      <Navigation />
      <BecomeSeller />
      <div className="flex gap-x-[2vw]">
        <Auth />
        <SideMenuButton />
      </div>
    </header>
  );
}
export default Header;
