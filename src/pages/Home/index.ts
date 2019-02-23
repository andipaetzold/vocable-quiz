import withUser from "hoc/withUser";
import { compose, Omit } from "recompose";
import Home, { Props } from "./presenter";

const enhance = compose<Props, Omit<Props, "user">>(withUser);

export default enhance(Home);
