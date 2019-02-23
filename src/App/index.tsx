import "antd/dist/antd.css";
import withAuthUserProvider from "hoc/withAuthUser/provider";
import { compose } from "recompose";
import App from "./presenter";

const enhance = compose(withAuthUserProvider);

export default enhance(App);
