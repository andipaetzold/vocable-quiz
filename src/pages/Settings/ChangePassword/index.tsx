import { Alert, Button, Card, Form, Input } from "antd";
import { auth, FirebaseError } from "firebase/app";
import AuthUserContext from "hoc/withAuthUser/context";
import React, { FormEvent, useContext, useState } from "react";
import { Trans } from "react-i18next";
import i18n from "i18n";

export default () => {
    const user = useContext(AuthUserContext);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [code, setCode] = useState<string | undefined>(undefined);

    if (!user) {
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return;
        }

        try {
            await user.reauthenticateAndRetrieveDataWithCredential(
                auth.EmailAuthProvider.credential(user.email as string, currentPassword)
            );
            await user.updatePassword(newPassword);
            setCode("success");
        } catch (e) {
            setCode((e as FirebaseError).code);
        }
    };

    if (code === "success") {
        return <Alert type="success" message="The password was successfully changed" />;
    }

    return (
        <Card title={<Trans i18nKey="pages.changepassword.title" />}>
            {code && <Alert type="error" message={code} />}
            <Form layout="horizontal" onSubmit={handleSubmit}>
                <Form.Item>
                    <Input type="email" placeholder={i18n.t("email")} value={user.email as string} autoComplete="username" readOnly />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder={i18n.t("passwordCurrent")}
                        value={currentPassword}
                        autoComplete="current-password"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder={i18n.t("passwordNew")}
                        value={newPassword}
                        autoComplete="new-password"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder={i18n.t("passwordRepeat")}
                        value={confirmPassword}
                        autoComplete="new-password"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        <Trans i18nKey="pages.changepassword.submit" />
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};
