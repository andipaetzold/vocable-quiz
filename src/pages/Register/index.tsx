import { Button, Card, Form, Icon, Input, message } from "antd";
import firebase from "firebase/app";
import useFirebase from "hooks/useFirebase";
import i18n from "i18n";
import React, { FormEvent, useState } from "react";
import { Trans } from "react-i18next";

export default function Register() {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            message.error("Passwords must match");
            return;
        }

        const hide = message.loading("Registering...");

        try {
            await firebase.createAccount(email, password);
            await firebase.login(email, password);
            const user = firebase.auth.currentUser as firebase.User;
            user.updateProfile({ displayName: name, photoURL: null });
            message.success("Registration successfull", 2);
        } catch (e) {
            let text = "Unknown Error";
            switch ((e as firebase.FirebaseError).code) {
                case "auth/email-already-in-use":
                    text = "The email address is already used";
                    break;
                case "auth/weak-password":
                    text = "Please use a stronger password";
                    break;
                case "auth/invalid-email":
                    text = "The email address is invalid";
                    break;
                case "auth/user-disabled":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    text = "The account wasn't created properly";
                    break;
                default:
                    console.error(e);
            }
            message.error(text);
        } finally {
            hide();
        }
    }
    return (
        <Card title={i18n.t("pages.register.title")}>
            <Form layout="vertical" onSubmit={handleSubmit}>
                <Form.Item>
                    <Input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        placeholder={i18n.t("name")}
                        value={name}
                        required
                        prefix={<Icon type="user" />}
                        autoComplete="name"
                    />
                </Form.Item>
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
                        autoComplete="new-password"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder={i18n.t("passwordRepeat")}
                        value={confirmPassword}
                        required
                        prefix={<Icon type="lock" />}
                        autoComplete="new-password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        <Trans i18nKey="pages.register.submit" />
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
