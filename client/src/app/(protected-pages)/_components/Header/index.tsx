import Logo from "@/app/_globalComponents/Logo";
import Auth from "@/app/_globalComponents/Auth";
import BecomeSeller from "./BecomeSeller";
import SideMenuButton from "./SideMenuButton";
import Cart from "./Cart";
import Theme from "@/app/_globalComponents/Theme";
import Notifications from "./Notifications";
import Search from "./Search";
import Bot from "./Bot";

function Header() {
  return (
    <header className="flex gap-x-[2vw] justify-between items-center  pr-[1vw] border-b border-base-content">
      <Logo />
      <Search />
      <div className="flex gap-x-[2vw]">
        <Bot />
        <BecomeSeller />
        <Auth />
        <Cart />
        <Theme />
        <Notifications />
        <SideMenuButton />
      </div>
    </header>
  );
}
export default Header;
