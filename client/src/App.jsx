import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Store from "./Pages/Store";
import Blog from "./Pages/Blog";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import ClientLogin from "./Pages/ClientLogin";
import ClientSignup from "./Pages/ClientSignup";
import NotFound from "./Pages/NotFound";
import ForgotPassword from "./Pages/ForgotPassword";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import ClientProfileSetup from "./Pages/ClientSignup/ClientProfileSetup";
import ClientVerify from "./Pages/ClientSignup/ClientVerify";
import ProductList from "./Pages/List";

import ClientPrivateRoute from "./components/ClientPrivateRoute"; // AuthGuard
import ClientPublicRoute from "./components/ClientPublicRoute"; // blocks logged-in users
import SignupGuard from "./components/SignupGuard"; // guards profile-setup & verify

import { useContext } from "react";
import ModalContext from "./Contexts/ModalContext";
import DrawerContext from "./Contexts/DrawerContext";
import Modal from "./components/Modal";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";

function App() {
  const {
    selectedProduct,
    handleCloseProductDetailsModal,
    openProductDetailsModal,
    maxWidth,
    fullWidth,
  } = useContext(ModalContext);

  const { drawer, orders } = useContext(DrawerContext);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/list" element={<ProductList />} />

        {/* Auth routes - blocked if already logged in */}
        <Route
          path="/login"
          element={
            <ClientPublicRoute>
              <ClientLogin />
            </ClientPublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ClientPublicRoute>
              <ClientSignup />
            </ClientPublicRoute>
          }
        />

        {/* Profile setup - only after signup, blocked if already done */}
        <Route
          path="/profile-setup"
          element={
            <SignupGuard step="profile-setup">
              <ClientProfileSetup />
            </SignupGuard>
          }
        />

        {/* OTP verification - only after profile setup */}
        <Route
          path="/verify"
          element={
            <SignupGuard step="verify">
              <ClientVerify />
            </SignupGuard>
          }
        />

        {/* Protected client routes */}
        <Route
          path="/profile"
          element={
            <ClientPrivateRoute>
              <Profile />
            </ClientPrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ClientPrivateRoute>
              <Checkout />
            </ClientPrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ClientPrivateRoute>
              <Orders />
            </ClientPrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />

      <Modal
        handleCloseProductDetailsModal={handleCloseProductDetailsModal}
        openProductDetailsModal={openProductDetailsModal}
        selectedProduct={selectedProduct}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      />

      <CartDrawer
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        orders={orders.list}
      />

      <Toast position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
