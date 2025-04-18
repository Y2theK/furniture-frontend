import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home, { homeLoader } from "@/pages/Home";
import Contact from "@/pages/Contact";
import RootLayout from "@/pages/RootLayout";
import Error from "@/pages/Error";
import About from "@/pages/About";
const Blog = lazy(() => import("@/pages/blogs/Blog"));
const BlogDetail = lazy(() => import("@/pages/blogs/BlogDetail"));
import Product from "@/pages/products/Product";
import ProductDetail from "@/pages/products/ProductDetail";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
const SuspenseFallback = () => {
  return <div className="text-center">Loading.......</div>;
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
        // before the page loads, we can do some data fetching
        loader: homeLoader,
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
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "blogs/:postId",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <BlogDetail />
          </Suspense>
        ),
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
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
