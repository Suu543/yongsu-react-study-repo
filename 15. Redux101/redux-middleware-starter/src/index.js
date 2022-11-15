import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const theStore = configureStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);
