import { MantineProvider } from "@mantine/core";
import { CartProvider } from "@react-providers/cart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { Register } from "./pages";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Verify from "./pages/auth/Verify";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import DashboardIndex from "./pages/dashboard";
import CategoriesIndex from "./pages/dashboard/categories";
import ProductsIndex from "./pages/dashboard/products";
import ProductCreate from "./pages/dashboard/products/Create";
import ProductUpdate from "./pages/dashboard/products/Edit";
import LandingPage from "./pages/Landing";
import PaymentPage from "./pages/Payment";
import ProductDescriptionPage from "./pages/ProductDescription";
import AuthProvider from "./providers/AuthProvider";
import OrderIndex from "./pages/dashboard/orders";
import CustomerIndex from "./pages/dashboard/customers";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: ":id/products",
        element: <ProductDescriptionPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },

      {
        path: "auth",
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: "register",
                element: <Register />,
              },
              {
                path: "verify",
                element: <Verify />,
              },
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "forgot-password",
                element: <ForgotPassword />,
              },
              {
                path: "reset-password/:resetToken",
                element: <ResetPassword />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardIndex />,
      },
      {
        path: "categories",
        element: <CategoriesIndex />,
      },
      {
        path: "orders",
        element: <OrderIndex />,
      },
      {
        path: "customers",
        element: <CustomerIndex />,
      },
      {
        path: "products",
        children: [
          {
            path: "",
            element: <ProductsIndex />,
          },
          {
            path: "remove",
            element: <ProductsIndex />,
          },
          {
            path: "create",
            element: <ProductCreate />,
          },
          {
            path: ":id/edit",
            element: <ProductUpdate />,
          },
        ],
      },
    ],
  },
]);

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          fontFamily: "Poppins, sans-serif",
          headings: {
            fontFamily: "Inter, sans-serif",
          },
          primaryColor: "yellow",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AuthProvider>
          <CartProvider storeName="Duk@an">
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </MantineProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
