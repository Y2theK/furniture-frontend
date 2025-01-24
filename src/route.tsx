import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import RootLayout from "@/pages/RootLayout";
import Error from "@/pages/Error";
import About from "@/pages/About";
import Blog from "@/pages/blogs/Blog";
import BlogDetail from "@/pages/blogs/BlogDetail";
import Product from "@/pages/products/Product";
import ProductDetail from "@/pages/products/ProductDetail";

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
      {
        path: "about", // dont need to add /about here since it is already added in the parent path
        element: <About />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "blogs/:postId",
        element: <BlogDetail />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "products/:productId",
        element: <ProductDetail />,
      },
    ],
  },
]);
