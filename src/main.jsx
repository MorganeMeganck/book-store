import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import NotFound from "./pages/errors/NotFound";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/books" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
