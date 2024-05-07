import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx";
import MyContextProvider from "./context/contextAPI.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MyContextProvider>
      <Router />
    </MyContextProvider>
  </React.StrictMode>
);
