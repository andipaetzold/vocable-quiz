import React from "react";
import Router from "./Router";
import styles from "./styles.m.less";

export default class App extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <h1>Vocable Quiz</h1>
        <Router />
      </div>
    );
  }
}
