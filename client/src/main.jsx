import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModalProvider from "./Providers/ModalProvider.jsx";
import DrawerProvider from "./Providers/DrawerProvider.jsx";
import { ThemeProvider } from "./Providers/ThemeProvider.jsx";
import ToastProvider from "./Providers/ToastProvider.jsx";
import UserProvider from "./Providers/UserProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ToastProvider>
        <ThemeProvider>
          <DrawerProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </DrawerProvider>
        </ThemeProvider>
      </ToastProvider>
    </UserProvider>
  </StrictMode>,
);
