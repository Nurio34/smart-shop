import Logo from "@/app/_globalComponents/Logo";
import Navigaion from "./Navigation";
import Auth from "@/app/_globalComponents/Auth";
import Theme from "@/app/_globalComponents/Theme";
import MobileNavigation from "./MobileNavigation";

function Header() {
  return (
    <header className="flex justify-between items-center pr-[1vw] border-b border-base-content">
      <Logo />
      <Navigaion />
      <div className="flex items-center gap-x-[4vw] md:gap-x-[2vw]">
        <Theme />
        <Auth />
        <MobileNavigation />
      </div>
    </header>
  );
}
export default Header;
