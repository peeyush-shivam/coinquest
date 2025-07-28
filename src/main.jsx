import { createRoot } from "react-dom/client";
import "./index.css";
import "./antd-overrides.css";
import App from "./App";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#667eea",
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <WalletProvider>
          <App />
        </WalletProvider>
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
