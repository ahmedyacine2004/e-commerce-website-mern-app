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
import Cart from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ProductList from "./Pages/List";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";

import { useContext } from "react";
import ModalContext from "./Contexts/ModalContext";
import DrawerContext from "./Contexts/DrawerContext";
import UserContext from "./Contexts/UserContext";

import Modal from "./components/Modal";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import ClientPrivateRoute from "./components/ClientPrivateRoute";

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
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/login" element={<ClientLogin />} />
        <Route path="/register" element={<ClientSignup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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
      <CartDrawer isOpen={drawer.isOpen} onClose={drawer.close} orders={orders.list} />
      <Toast position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
