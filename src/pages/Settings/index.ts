import { compose, Omit } from "recompose";
import Settings, { Props } from "./presenter";

const enhance = compose<Props, Omit<Props, never>>();

export default enhance(Settings);
