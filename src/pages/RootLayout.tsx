import Header from "@/components/Layout/Header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
      <div>Footer</div>
    </div>
  );
}

export default RootLayout;
