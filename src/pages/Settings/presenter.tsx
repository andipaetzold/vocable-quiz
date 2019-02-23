import React from "react";
import ChangePassword from "./ChangePassword";
import ChangeData from "./ChangeData";
import styles from "./styles.m.less";

export default class Settings extends React.PureComponent {
  render() {
    return (
      <>
        <div className={styles.marginBottom}>
          <ChangeData />
        </div>
        <ChangePassword />
      </>
    );
  }
}
