import * as Sentry from "@sentry/browser";
import ErrorBoundary from "components/ErrorBoundary";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import Firebase from "./components/Firebase";
import FirebaseContext from "./components/Firebase/context";
import i18n from "./i18n";

Sentry.init({
    dsn: "https://8eb50a9ec3074d99a8f58c78a5e89971@sentry.io/1457633",
    enabled: !__DEV__
});

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <ErrorBoundary>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </ErrorBoundary>
    </I18nextProvider>,
    document.getElementById("root")
);

if (!__DEV__ && navigator.serviceWorker) {
    navigator.serviceWorker.register("service-worker.js");
}
