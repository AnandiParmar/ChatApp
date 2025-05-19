import { createRoot } from "react-dom/client";

import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";
import { persistor } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer autoClose={200} />
      <App />
    </PersistGate>
  </Provider>
);
