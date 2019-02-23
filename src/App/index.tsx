import "antd/dist/antd.css";
import withAuthUserProvider from "hoc/withAuthUser/provider";
import withUserProvider from "hoc/withUser/provider";
import { compose } from "recompose";
import App from "./presenter";

const enhance = compose(
  withAuthUserProvider,
  withUserProvider
);

export default enhance(App);
