import { compose } from "recompose";
import withUserProvider from "../hoc/withUser/provider";
import App from "./presenter";

const enhance = compose(withUserProvider);

export default enhance(App);
