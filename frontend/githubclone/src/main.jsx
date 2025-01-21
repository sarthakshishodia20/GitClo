import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./authContext.jsx";
import ProjectRoutes from "./Routes.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // Allows all file the access of User Information
  <AuthProvider>
    <BrowserRouter>
      <ProjectRoutes/>
    </BrowserRouter>
  </AuthProvider>
);
