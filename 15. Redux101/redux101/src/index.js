import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// 1. In order to wire up a redux/react app, we need react-redux
// 2. We need the Provider Component, to be around everything!
import { Provider } from "react-redux";

// 3. Create the redux store, so that redux exists, and the provider has a store
import { createStore } from "redux";

// 4. Reducers to populate the store
// 4a. We always start with a rootReducer
// src/reducers 폴더 생성 ==> rootReducer.js 생성

// 5. Make individual reducers to hand to the rootReducer
import rootReducer from "./reducers/rootReducer";

// 6. Create the store by passing it the rootReducer, which is made up of the reducers
const theStore = createStore(rootReducer);

// Provider is the glue between react and redux, Give it the store!
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);
