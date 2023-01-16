import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import logger from "./services/logService";

logger.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
