import { Badge, Button, Icon, Layout, Menu } from "antd";
import useFirebase from "../../hooks/useFirebase";
import useSubjects from "../../hooks/useSubjects";
import CreateCard from "../CreateCard";
import Edit from "../Edit";
import EditCard from "../EditCard";
import EditCards from "../EditCards";
import Home from "../Home";
import Quiz from "../Quiz";
import QuizList from "../QuizList";
import Settings from "../Settings";
import { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import { getTodayCardCount } from "../../util/subject";
const { Content, Header } = Layout;

type Props = RouteComponentProps<{}>;

export default function Shell({ location }: Props) {
    const firebase = useFirebase();

    const { subjects } = useSubjects();
    const quizCount = (subjects || []).map(getTodayCardCount).reduce((prev, cur) => prev + cur, 0);

    const [currentItem, setCurrentItem] = useState<"home" | "quiz" | "edit" | "settings">("home");

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
            <Header style={{ backgroundColor: "white", padding: 0 }}>
                <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px", textAlign: "center" }} selectedKeys={[currentItem]}>
                    <Menu.Item key="home" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                        <Link to="/">
                            <Icon type="home" /> <Trans i18nKey="pages.shell.home" />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="quiz" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                        <Link to="/quiz">
                            <Icon type="question" /> <Trans i18nKey="pages.shell.quiz" /> <Badge count={quizCount} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="edit" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                        <Link to="/edit">
                            <Icon type="edit" /> <Trans i18nKey="pages.shell.edit" />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="settings" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                        <Link to="/settings">
                            <Icon type="setting" /> <Trans i18nKey="pages.shell.settings" />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="logout" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                        <Button type="danger" onClick={firebase.logout}>
                            <Icon type="logout" /> <Trans i18nKey="pages.shell.logout" />
                        </Button>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ paddingTop: "20px", maxWidth: "1000px", width: "100%", margin: "auto" }}>
                <Switch>
                    <Route path="/quiz/:subjectId" component={Quiz} />
                    <Route path="/quiz" component={QuizList} />
                    <Route path="/edit/:subjectId/create" component={CreateCard} />
                    <Route path="/edit/:subjectId/:cardId" component={EditCard} />
                    <Route path="/edit/:subjectId" component={EditCards} />
                    <Route path="/edit" component={Edit} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/" component={Home} />
                </Switch>
            </Content>
        </>
    );
}
