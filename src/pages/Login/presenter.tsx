import { Button, Form, Icon, Input, Layout } from "antd";
import Firebase from "components/Firebase/firebase";
import React, { FormEvent, useState } from "react";
import { RouteProps } from "react-router";
import AuthError from "./AuthError";

export type Props = {
  firebase: Firebase;
  user: firebase.User;
} & RouteProps;

const Login = ({ firebase }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState<string | undefined>(undefined);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await firebase.login(email, password);
    } catch (e) {
      setCode(e.code);
    }
  }

  return (
    <Layout.Content>
      {code && <AuthError code={code} />}
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="email"
            onChange={e => setEmail(e.target.value)}
            placeholder={"Email Address"}
            value={email}
            required
            prefix={<Icon type="mail" />}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder={"Password"}
            value={password}
            required
            prefix={<Icon type="lock" />}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </Layout.Content>
  );
};

export default Login;
