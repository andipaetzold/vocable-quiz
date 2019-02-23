import { Button, Form, Input, Alert, Card } from "antd";
import FirebaseContext from "components/Firebase/context";
import { auth, FirebaseError } from "firebase/app";
import AuthUserContext from "hoc/withAuthUser/context";
import React, { FormEvent, useContext, useState } from "react";

export default () => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(AuthUserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState<string | undefined>(undefined);

  if (!user || firebase == null) {
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
    return (
      <Alert type="success" message="The password was successfully changed" />
    );
  }

  return (
    <Card title="Change Password">
      {code && <Alert type="error" message={code} />}
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="email"
            value={user.email as string}
            autoComplete="username"
            readOnly
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder={"Current Password"}
            value={currentPassword}
            autoComplete="current-password"
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            onChange={e => setNewPassword(e.target.value)}
            placeholder={"New Password"}
            value={newPassword}
            autoComplete="new-password"
            required
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder={"Confirm Password"}
            value={confirmPassword}
            autoComplete="new-password"
            required
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form>
    </Card>
  );
};
