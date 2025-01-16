import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import RootLayout from "@/pages/RootLayout";
import Error from "@/pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);
