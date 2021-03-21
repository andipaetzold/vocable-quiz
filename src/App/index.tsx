import "antd/dist/antd.css";
import withAuthUserProvider from "../hoc/withAuthUser/provider";
import App from "./presenter";

export default withAuthUserProvider(App);
