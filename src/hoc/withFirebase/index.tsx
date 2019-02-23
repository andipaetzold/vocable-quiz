import React, { ComponentType } from "react";
import { Subtract } from "utility-types";
import FirebaseContext from "../../components/Firebase/context";
import Firebase from "../../components/Firebase";

interface InjectedProps {
  firebase: Firebase;
}

export default function withFirebase<T extends InjectedProps>(
  Component: ComponentType<T>
) {
  return class WithFirebase extends React.PureComponent<
    Subtract<T, InjectedProps>
  > {
    render() {
      return (
        <FirebaseContext.Consumer>
          {firebase =>
            firebase && <Component {...this.props as any} firebase={firebase} />
          }
        </FirebaseContext.Consumer>
      );
    }
  };
}
