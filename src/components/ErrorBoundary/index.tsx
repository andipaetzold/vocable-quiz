import * as Sentry from "@sentry/browser";
import { Alert, Button } from "antd";
import React, { ErrorInfo, PureComponent } from "react";
import { Trans } from "react-i18next";

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

interface State {
    error: Error | null;
}

export default class ErrorBoundary extends PureComponent<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = { error: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error });
        Sentry.withScope(scope => {
            scope.setExtras(errorInfo);
            Sentry.captureException(error);
        });
    }

    public render() {
        if (this.state.error) {
            return (
                <Alert
                    message={<Trans i18nKey="error.title" />}
                    description={
                        <>
                            <p>
                                <Trans i18nKey="error.message" />
                            </p>
                            <Button onClick={() => document.location.reload()}>
                                <Trans i18nKey="error.reload" />
                            </Button>
                        </>
                    }
                    type="error"
                    showIcon
                    banner
                />
            );
        }

        return this.props.children;
    }
}
