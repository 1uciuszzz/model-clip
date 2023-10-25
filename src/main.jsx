import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import RootLayout from "./RootLayout.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./stores";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <RouterProvider router={router}>
        <RootLayout />
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);
