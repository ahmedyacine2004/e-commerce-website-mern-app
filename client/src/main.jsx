import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModalProvider from "./Providers/ModalProvider.jsx";
import DrawerProvider from "./Providers/DrawerProvider.jsx";
import { ThemeProvider } from "./Providers/ThemeProvider.jsx";
import ToastProvider from "./Providers/ToastProvider.jsx";
import UserProvider from "./Providers/UserProvider.jsx";
import ListProvider from "./Providers/ListProvider.jsx";
import OrdersProvider from "./Providers/OrdersProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <UserProvider>
        <OrdersProvider>
          <ListProvider>
            <ToastProvider>
              <ThemeProvider>
                <DrawerProvider>
                  <App />
                </DrawerProvider>
              </ThemeProvider>
            </ToastProvider>
          </ListProvider>
        </OrdersProvider>
      </UserProvider>
    </ModalProvider>
  </StrictMode>,
);
