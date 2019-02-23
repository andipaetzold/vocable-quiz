import { Layout, Menu, Icon } from "antd";
import LogoutButton from "components/LogoutButton";
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import Settings from "pages/Settings";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styles from "./styles.m.less";
const { Content, Header } = Layout;

export default class Shell extends React.PureComponent {
  render() {
    return (
      <>
        <Header style={{ backgroundColor: "white" }}>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: "64px", textAlign: "center" }}
          >
            <Menu.Item>
              <Link to="/">
                <Icon type="home" /> Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/quiz">
                <Icon type="question" /> Quiz
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/input">
                <Icon type="plus" /> Input
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/settings">
                <Icon type="setting" /> Settings
              </Link>
            </Menu.Item>
            <LogoutButton />
          </Menu>
        </Header>
        <Content className={styles.content}>
          <Switch>
            <Route path="/quiz" component={Quiz} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>
      </>
    );
  }
}
