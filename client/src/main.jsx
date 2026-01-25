import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModalProvider from "./Providers/ModalProvider.jsx";
import DrawerProvider from "./Providers/DrawerProvider.jsx";
import { ThemeProvider } from "./Providers/ThemeProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <DrawerProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </DrawerProvider>
    </ThemeProvider>
  </StrictMode>,
);
