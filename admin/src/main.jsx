import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminProvider from "./Providers/AdminProvider.jsx";
import { OrdersProvider } from "./Providers/OrdersProvider.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SalesProvider } from "./Providers/SalesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AdminProvider>
        <OrdersProvider>
          <SalesProvider>
            <App />
          </SalesProvider>
        </OrdersProvider>
      </AdminProvider>
    </LocalizationProvider>
  </StrictMode>,
);
