import React from "react";
import firebase from "firebase/app";

const AuthUserContext = React.createContext<firebase.User | undefined>(undefined);
export default AuthUserContext;
