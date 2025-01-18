import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";
import MobileNavigation from "./MobileNavigation";

function Header() {
  return (
    <header className="w-full border-b">
      <nav className="container flex h-16 items-center justify-between mx-auto">
        <MainNavigation items={siteConfig.mainNav}/>
        <MobileNavigation items={siteConfig.mainNav}/>
      </nav>
    </header>
  );
}

export default Header;
