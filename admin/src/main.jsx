import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminProvider from "./Providers/AdminProvider.jsx";
import { OrdersProvider } from "./Providers/OrdersProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </AdminProvider>
  </StrictMode>,
);
