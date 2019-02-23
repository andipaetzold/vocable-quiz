import { Button, Card, Form, Input } from "antd";
import AuthUserContext from "hoc/withAuthUser/context";
import useFirebase from "hooks/useFirebase";
import React, { FormEvent, useContext, useState } from "react";

export default function CreateSubject() {
  const firebase = useFirebase();
  const user = useContext(AuthUserContext);
  const [name, setName] = useState("");

  if (!user) {
    throw new Error("User is undefined");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await firebase.createSubject(user, name);

    setName("");
  };

  return (
    <Card title="Create Subject">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="text"
            placeholder="Name of the Subject"
            onChange={e => setName(e.target.value)}
            value={name}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
