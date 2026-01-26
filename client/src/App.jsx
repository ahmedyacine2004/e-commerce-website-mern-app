// Import layout components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import routing tools
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import Home from "./Pages/Home";
import Store from "./Pages/Store";
import Blog from "./Pages/Blog";
import ProductListing from "./Pages/ProductListing";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ProductList from "./Pages/List";
import Profile from "./Pages/Profile";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";

// Import React hooks and context
import { useContext } from "react";
import ModalContext from "./Contexts/ModalContext";
import DrawerContext from "./Contexts/DrawerContext";
import UserContext from "./Contexts/UserContext";

// Import components
import Modal from "./components/Modal";
import CartDrawer from "./components/CartDrawer";
import Toast from "./components/Toast";
import ForgotPassword from "./Pages/ForgotPassword";


function App() {
  // Extract modal-related state and handlers from ModalContext
  const {
    selectedProduct,
    handleCloseProductDetailsModal,
    openProductDetailsModal,
    maxWidth,
    fullWidth,
  } = useContext(ModalContext);

  const { drawer, orders } = useContext(DrawerContext);
  const { user } = useContext(UserContext);

  return (
    <>
      {/* Theme wrapper for the entire application */}

      {/* Router wrapper */}
      <BrowserRouter>
        {/* App header */}
        <Header />

        {/* Application routes */}
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/store"} element={<Store />} />
          <Route path={"/blog"} element={<Blog />} />
          <Route path={"/product-listing"} element={<ProductListing />} />
          <Route path={"/product-details/:id"} element={<ProductDetails />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Signup />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/verify"} element={<Verify />} />
          <Route path={"/forgot-password"} element={<ForgotPassword />} />
          <Route path={"/checkout"} element={<Checkout />} />
          <Route path={"/list"} element={<ProductList />} />
          <Route path={"/orders"} element={<Orders />} />

          <Route path={"/*"} element={<NotFound />} />
          {user.isLogged && <Route path={"/profile"} element={<Profile />} />}
        </Routes>

        {/* App footer */}
        <Footer></Footer>
        {/* Global product details modal */}
        <Modal
          handleCloseProductDetailsModal={handleCloseProductDetailsModal}
          openProductDetailsModal={openProductDetailsModal}
          selectedProduct={selectedProduct}
          maxWidth={maxWidth}
          fullWidth={fullWidth}
        />
        {/* Global order details drawer */}
        <CartDrawer
          isOpen={drawer.isOpen}
          onClose={drawer.close}
          orders={orders.list}
        />
        <Toast position="bottom-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
