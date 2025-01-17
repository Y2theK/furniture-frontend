import { siteConfig } from "@/config/site";
import MainNavigation from "./MainNavigation";

function Header() {
  return (
    <header className="w-full border-b">
      <nav className="container flex h-16 items-center justify-between">
        <MainNavigation items={siteConfig.mainNav}/>
      </nav>
    </header>
  );
}

export default Header;
