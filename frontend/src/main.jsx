import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProductPage from "./pages/ProductPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout.jsx";
import CartProvider from "./context/CartProvider.jsx";
import CartPage from "./pages/CartPage.jsx";
import SortedPaginatedProductsListPage from "./pages/SortedPaginatedProductsListPage.jsx";

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
        element: (
          <SortedPaginatedProductsListPage
            url={""}
            filterParam={"category"}
            emptyMessage={"no products"}
          />
        ),
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
        element: (
          <SortedPaginatedProductsListPage
            url={"/search"}
            filterParam={"pattern"}
            emptyMessage={"no products"}
          />
        ),
      },
      // 5. Маршрут 404 (Необязательно, но полезно):
      // Добавьте этот маршрут в MainLayout, если он должен иметь шапку/подвал.
      // {
      //   path: "*",
      //   element: <NotFoundPage />,
      // },
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
