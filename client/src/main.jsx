import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModalProvider from "./Providers/ModalProvider.jsx";
import DrawerProvider from "./Providers/DrawerProvider.jsx";
import { ThemeProvider } from "./Providers/ThemeProvider.jsx";
import ToastProvider from "./Providers/ToastProvider.jsx";
import UserProvider from "./Providers/UserProvider.jsx";
import ListProvider from "./Providers/ListProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ListProvider>
        <ToastProvider>
          <ThemeProvider>
            <DrawerProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </DrawerProvider>
          </ThemeProvider>
        </ToastProvider>
      </ListProvider>
    </UserProvider>
  </StrictMode>,
);
