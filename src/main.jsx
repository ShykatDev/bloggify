import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ProfileProvider from "./providers/ProfileProvider.jsx";
import AuthorProvider from "./providers/AuthorProvider.jsx";
import LocalStorageProvider from "./providers/LocalStorageProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalStorageProvider>
      <AuthorProvider>
        <ProfileProvider>
          <Router>
            <App />
          </Router>
        </ProfileProvider>
      </AuthorProvider>
    </LocalStorageProvider>
  </React.StrictMode>
);
