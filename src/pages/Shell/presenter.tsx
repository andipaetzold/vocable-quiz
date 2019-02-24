import { Button, Icon, Layout, Menu } from "antd";
import useFirebase from "hooks/useFirebase";
import CreateCard from "pages/CreateCard";
import Edit from "pages/Edit";
import EditCards from "pages/EditCards";
import Home from "pages/Home";
import Quiz from "pages/Quiz";
import Settings from "pages/Settings";
import React, { useEffect, useState } from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import styles from "./styles.m.less";
const { Content, Header } = Layout;

type Props = RouteComponentProps<{}>;

export default function Shell({ location }: Props) {
  const firebase = useFirebase();

  const [currentItem, setCurrentItem] = useState<
    "home" | "quiz" | "edit" | "settings"
  >("home");

  useEffect(() => {
    if (location.pathname.startsWith("/quiz")) {
      setCurrentItem("quiz");
    } else if (location.pathname.startsWith("/edit")) {
      setCurrentItem("edit");
    } else if (location.pathname.startsWith("/settings")) {
      setCurrentItem("settings");
    } else {
      setCurrentItem("home");
    }
  }, [location.pathname]);

  return (
    <>
      <Header style={{ backgroundColor: "white" }}>
        <Menu
          theme="light"
          mode="horizontal"
          style={{ lineHeight: "64px", textAlign: "center" }}
          selectedKeys={[currentItem]}
        >
          <Menu.Item key="home">
            <Link to="/">
              <Icon type="home" /> Home
            </Link>
          </Menu.Item>
          <Menu.Item key="quiz">
            <Link to="/quiz">
              <Icon type="question" /> Quiz
            </Link>
          </Menu.Item>
          <Menu.Item key="edit">
            <Link to="/edit">
              <Icon type="edit" /> Edit
            </Link>
          </Menu.Item>
          <Menu.Item key="settings">
            <Link to="/settings">
              <Icon type="setting" /> Settings
            </Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button type="danger" onClick={firebase.logout}>
              <Icon type="logout" /> Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.content}>
        <Switch>
          <Route path="/quiz" component={Quiz} />
          <Route path="/edit/:subjectId/create" component={CreateCard} />
          <Route path="/edit/:subjectId" component={EditCards} />
          <Route path="/edit" component={Edit} />
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Home} />
        </Switch>
      </Content>
    </>
  );
}
