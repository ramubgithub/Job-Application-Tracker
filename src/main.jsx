import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import JobProvider from "./Context/JobProvider.jsx";
import ToastProvider from "./Context/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <JobProvider>
          <App />
        </JobProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);
