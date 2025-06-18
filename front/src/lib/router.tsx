import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../ui/pages/Product/List/ProductList";
import CreateProduct from "../ui/pages/Product/Create/CreateProduct";
import { ProtectedRoute } from "../ui/components/ProtectedRoute/ProtectedRoute";
import Login from "../ui/pages/Auth/Login/Login";
import { SignUp } from "../ui/pages/Auth/SignUp/SignUp";
import { Cart } from "../ui/pages/Cart/Cart";
import { Contact } from "../ui/pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/signup", element: <SignUp /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "", element: <ProductList /> },
          { path: "products/create", element: <CreateProduct /> },
          { path: "cart", element: <Cart /> },
          { path: "contact", element: <Contact /> },
        ],
      },
    ],
  },
]);
