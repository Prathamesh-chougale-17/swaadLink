import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ClerkProvider>
  </React.StrictMode>
);
