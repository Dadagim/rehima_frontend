import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HelmetProvider } from 'react-helmet-async';
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
    <HelmetProvider>
        <StrictMode>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </StrictMode>
    </HelmetProvider>
    ,
);