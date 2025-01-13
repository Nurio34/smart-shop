import Logo from "@/app/_globalComponents/Logo";
import Navigaion from "./Navigation";
import Auth from "@/app/_globalComponents/Auth";

function Header() {
  return (
    <header className="flex justify-between items-center pr-[1vw] border-b border-base-content">
      <Logo />
      <Navigaion />
      <Auth />
    </header>
  );
}
export default Header;
