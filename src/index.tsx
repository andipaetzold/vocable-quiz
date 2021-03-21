import * as Sentry from "@sentry/react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import ErrorBoundaryFallback from "./components/ErrorBoundaryFallback";
import Firebase from "./components/Firebase";
import FirebaseContext from "./components/Firebase/context";
import i18n from "./i18n";
import { register } from "./serviceWorkerRegistration";

Sentry.init({
    dsn: "https://8eb50a9ec3074d99a8f58c78a5e89971@sentry.io/1457633",
    enabled: process.env.NODE_ENV === "production",
});

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
        <Sentry.ErrorBoundary fallback={<ErrorBoundaryFallback />}>
            <FirebaseContext.Provider value={new Firebase()}>
                <App />
            </FirebaseContext.Provider>
        </Sentry.ErrorBoundary>
    </I18nextProvider>,
    document.getElementById("root")
);

register();
