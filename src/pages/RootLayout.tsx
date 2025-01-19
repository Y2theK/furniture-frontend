import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
