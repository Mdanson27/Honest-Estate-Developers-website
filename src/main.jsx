import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import MediaEnhancer from "./media";
import MediaRefinement from "./media-refine";
import "./styles.css";
import "./media.css";
import "./media-refine.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <MediaEnhancer />
      <MediaRefinement />
    </HashRouter>
  </React.StrictMode>
);
