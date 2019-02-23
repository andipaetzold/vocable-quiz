import { Layout, Menu } from "antd";
import LogoutButton from "components/LogoutButton";
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import Settings from "pages/Settings";
import React from "react";
import { Link, Route } from "react-router-dom";
import styles from "./styles.m.less";
const { Content, Header } = Layout;

export default class Shell extends React.PureComponent {
  render() {
    return (
      <>
        <Header style={{ backgroundColor: "white" }}>
          <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/quiz">Quiz</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/input">Input</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/settings">Settings</Link>
            </Menu.Item>
            <LogoutButton />
          </Menu>
        </Header>
        <Content className={styles.content}>
          <Route path="/" component={Home} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/settings" component={Settings} />
        </Content>
      </>
    );
  }
}
