import React from "react";
import "./css/index.scss";
import { Provider } from "react-redux";
import App from "./js/App";
import ReactDOM from "react-dom";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
