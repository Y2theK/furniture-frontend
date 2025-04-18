import api from "@/api";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Outlet, redirect } from "react-router-dom";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export const logoutAction = async () => {
  try {
    await api.post("logout");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default RootLayout;
