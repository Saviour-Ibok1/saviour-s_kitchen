import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import About from "../pages/About";
import Search from "../pages/search";
import Wishlist from "../pages/wishlist";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";

import Login from "../components/profile/Login";
import Register from "../components/profile/Register";
import OrderSuccess from "../components/checkout/OrderSuccess";
import ProtectedRoute from "../components/profile/ProtectedRoute";
import AdminRoute from "../components/profile/AdminRoute";
import AdminDashboard from "../pages/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/about" element={<About />} />

        <Route path="/search" element={<Search />} />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}