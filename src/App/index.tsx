import "antd/dist/antd.css";
import withUserProvider from "hoc/withUser/provider";
import { compose } from "recompose";
import App from "./presenter";

const enhance = compose(withUserProvider);

export default enhance(App);
