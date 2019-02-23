import React from "react";
import c from "classnames";

export type Props = {} & React.HTMLAttributes<HTMLHeadingElement>;

export default class AppHeading extends React.PureComponent<Props> {
  render() {
    const { className, ...other } = this.props;

    return <h2 {...other} className={c(className)} />;
  }
}
