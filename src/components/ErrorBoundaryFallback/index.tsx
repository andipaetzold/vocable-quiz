import { Alert, Button } from "antd";
import { Trans } from "react-i18next";

export default function ErrorBoundaryFallback() {
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
