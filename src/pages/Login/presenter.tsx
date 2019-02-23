import React, { useState } from "react";
import { RouteProps, Redirect } from "react-router";
import Firebase from "../../components/Firebase/firebase";

export type Props = {
  firebase: Firebase;
  user: firebase.User;
} & RouteProps;

const Login = ({ firebase, location, user }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState<string | undefined>(undefined);

  return (
    <>
      <h2>Login</h2>
      {code}
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <input
        type="button"
        onClick={async () => {
          try {
            await firebase.login(email, password);
          } catch (e) {
            setCode(e.code);
          }
        }}
        value="Submit"
      />
    </>
  );
};
export default Login;
