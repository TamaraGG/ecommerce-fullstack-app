import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProductPage from "./pages/ProductPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout.jsx";
import CartProvider from "./context/CartProvider.jsx";
import CartPage from "./pages/CartPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import styles from "./styles/index.module.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "products/",
        element: <CategoryPage />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
