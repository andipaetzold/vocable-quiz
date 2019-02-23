import { compose } from "recompose";
import withUserProvider from "../hoc/withUser/provider";
import App from "./presenter";
import "antd/dist/antd.css";

const enhance = compose(withUserProvider);

export default enhance(App);
