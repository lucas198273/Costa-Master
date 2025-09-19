import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Importe o HelmetProvider
import "./index.css";
import "./App.css";
import AppContent from "./App";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "././../contexts/CartContext";
import theme from "./styles/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <HelmetProvider> {/* Adicione o HelmetProvider aqui */}
          <CartProvider>
            <AppContent />
            <ToastContainer />
          </CartProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);