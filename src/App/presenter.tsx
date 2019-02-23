import React from "react";
import Router from "./Router";
import styles from "./styles.m.less";
import LogoutButton from "../components/LogoutButton";

export default class App extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <Router>
          <h1>Vocable Quiz</h1>
          <LogoutButton />
        </Router>
      </div>
    );
  }
}
