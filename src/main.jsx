import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  // Import the Provider
import App from "./App";
import store from "./Redux/store";  // Import your Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap your App component with Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
