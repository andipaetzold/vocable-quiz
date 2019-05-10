import { Layout } from "antd";
import React from "react";
import Router from "./Router";
const { Footer } = Layout;

export default class App extends React.PureComponent {
    render() {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Router />
                <Footer style={{ textAlign: "center" }}>Vocable Quiz by Andi Pätzold</Footer>
            </Layout>
        );
    }
}
