import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { Router } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import history from "./util/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <Router history={history}>
            {/* <React.StrictMode> */}
            <App />
            {/* </React.StrictMode> */}
        </Router>
    </Provider>
);
