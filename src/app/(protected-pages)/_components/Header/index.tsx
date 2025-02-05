import Logo from "@/app/_globalComponents/Logo";
import Auth from "@/app/_globalComponents/Auth";
import BecomeSeller from "./BecomeSeller";
import SideMenuButton from "./SideMenuButton";
import Cart from "./Cart";
import Theme from "@/app/_globalComponents/Theme";
import Notifications from "./Notifications";
import Bot from "./Bot";
import Search from "./Search";

async function Header() {
  return (
    <header className="grid grid-rows-[1fr,auto] border-b border-base-content pb-2">
      <div className="flex gap-x-[2vw] justify-between items-center pr-[1vw] ">
        <Logo />
        <div className=" relative grow hidden md:block">
          <Search />
        </div>
        <div className="flex justify-between gap-x-0 md:gap-x-[2vw] grow md:grow-0">
          <Bot />
          <BecomeSeller />
          <Auth />
          <Cart />
          <Theme />
          <Notifications />
          <SideMenuButton />
        </div>
      </div>
      <div className="md:hidden px-[1vw]">
        <Search />
      </div>
    </header>
  );
}
export default Header;
