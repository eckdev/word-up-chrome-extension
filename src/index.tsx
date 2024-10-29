import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import "./index.css"

const rootElement = document.createElement("div");
rootElement.id = "word-of-the-day";
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>
);
