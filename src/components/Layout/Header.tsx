import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full border-b">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/">Fashion Shop</Link>
        <button className="">&#8801;</button>
      </nav>
    </header>
  );
}

export default Header;
