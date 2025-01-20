import Logo from "@/app/_globalComponents/Logo";
import Navigaion from "./Navigation";
import Auth from "@/app/_globalComponents/Auth";
import Theme from "@/app/_globalComponents/Theme";

function Header() {
  return (
    <header className="flex justify-between items-center pr-[1vw] border-b border-base-content">
      <Logo />
      <Navigaion />
      <div className="flex items-center gap-x-[1vw]">
        <Theme />
        <Auth />
      </div>
    </header>
  );
}
export default Header;
