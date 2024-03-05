import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import ProfileProvider from "./providers/ProfileProvider.jsx";
import AuthorProvider from "./providers/AuthorProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthorProvider>
      <ProfileProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </ProfileProvider>
    </AuthorProvider>
  </React.StrictMode>
);
