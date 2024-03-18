import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./context/AuthContext.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// Define base url for each axios request, with credentials: ensures that cookies are included in requests
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.defaults.withCredentials = true;

// Creating a theme from Materials UI
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: {
      color: "white",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
