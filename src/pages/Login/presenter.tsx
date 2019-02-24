import { Button, Form, Icon, Input, Layout, Card, message } from "antd";
import useFirebase from "hooks/useFirebase";
import React, { FormEvent, useState } from "react";
import styles from "./styles.m.less";
import { FirebaseError } from "firebase";

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
    <Layout.Content className={styles.content}>
      <Card title="Login">
        <Form layout="horizontal" onSubmit={handleSubmit}>
          <Form.Item>
            <Input
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
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
              placeholder="Password"
              value={password}
              required
              prefix={<Icon type="lock" />}
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout.Content>
  );
}
