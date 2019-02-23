import { Button, Form, Input, Alert, Card } from "antd";
import FirebaseContext from "components/Firebase/context";
import { auth, FirebaseError } from "firebase/app";
import AuthUserContext from "hoc/withAuthUser/context";
import React, { FormEvent, useContext, useState } from "react";

export default function ChangeData() {
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthUserContext);

  if (!user || !firebase) {
    throw Error("Something went wrong");
  }

  const [name, setName] = useState<string>(user.displayName || "");
  const [email, setEmail] = useState<string>(user.email || "");
  const [code, setCode] = useState<string | undefined>(undefined);

  if (!user || firebase == null) {
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await user.updateEmail(email);
      await user.updateProfile({ displayName: name, photoURL: null });

      setCode("success");
    } catch (e) {
      setCode((e as FirebaseError).code);
    }
  };

  if (code === "success") {
    return <Alert type="success" message="The data was change successfully" />;
  }

  return (
    <Card title="Change Data">
      {code && <Alert type="error" message={code} />}
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="text"
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            value={name}
            autoComplete="name"
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="E-Mail"
            value={email}
            autoComplete="username"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Change Data
        </Button>
      </Form>
    </Card>
  );
}
