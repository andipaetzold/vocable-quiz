import { Layout } from "antd";
import React from "react";
import Router from "./Router";
const { Footer } = Layout;

export default class App extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Router />
        <Footer>Vocable Quiz by Andi Pätzold</Footer>
      </Layout>
    );
  }
}
