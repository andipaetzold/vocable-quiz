import { Button, Card, Form, Icon, Input, Layout, message } from "antd";
import { FirebaseError } from "firebase";
import useFirebase from "hooks/useFirebase";
import i18n from "i18n";
import Register from "pages/Register";
import React, { FormEvent, useState } from "react";
import { Trans } from "react-i18next";

export default function Login() {
    const firebase = useFirebase();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const hide = message.loading("Logging in...");

        try {
            await firebase.login(email, password);
        } catch (e) {
            let text = "Unknown Error";
            switch ((e as FirebaseError).code) {
                case "auth/invalid-email":
                    text = "The email address is invalid";
                    break;
                case "auth/user-disabled":
                    text = "The account has been disabled";
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    text = "The email address or the password is wrong";
                    break;
            }
            message.error(text);
        } finally {
            hide();
        }
    }

    return (
        <Layout.Content style={{ padding: "25px 50px", maxWidth: "1000px", width: "100%", margin: "auto" }}>
            <Card title={<Trans i18nKey="pages.login.title" />} style={{ marginBottom: "20px" }}>
                <Form layout="vertical" onSubmit={handleSubmit}>
                    <Form.Item>
                        <Input
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            placeholder={i18n.t("email")}
                            value={email}
                            required
                            prefix={<Icon type="mail" />}
                            autoComplete="username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder={i18n.t("password")}
                            value={password}
                            required
                            prefix={<Icon type="lock" />}
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            <Trans i18nKey="pages.login.submit" />
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Register />
        </Layout.Content>
    );
}
