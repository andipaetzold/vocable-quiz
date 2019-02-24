import { Button, Card, Form, Input } from "antd";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import React, { FormEvent, useState } from "react";
import { Trans } from "react-i18next";
import i18n from "i18n";

export default function CreateSubject() {
  const firebase = useFirebase();
  const user = useUser();
  const [name, setName] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await firebase.createSubject(user, name);

    setName("");
  };

  return (
    <Card title={<Trans i18nKey="pages.createsubject.title" />}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="text"
            placeholder={i18n.t("pages.createsubject.name")}
            onChange={e => setName(e.target.value)}
            value={name}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <Trans i18nKey="pages.createsubject.submit" />
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
