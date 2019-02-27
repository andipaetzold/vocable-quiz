import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import Firebase from "./components/Firebase";
import FirebaseContext from "./components/Firebase/context";
import i18n from "./i18n";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV !== "development" && navigator.serviceWorker) {
  navigator.serviceWorker.register("service-worker.js");
}
