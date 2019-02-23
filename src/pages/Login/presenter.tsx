import { Button, Form, Icon, Input, Layout } from "antd";
import useFirebase from "hooks/useFirebase";
import React, { FormEvent, useState } from "react";
import AuthError from "./AuthError";

const Login = () => {
  const firebase = useFirebase();

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
    </Layout.Content>
  );
};

export default Login;
