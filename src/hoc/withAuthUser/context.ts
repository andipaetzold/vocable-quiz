import React from "react";

const AuthUserContext = React.createContext<firebase.User | undefined>(undefined);
export default AuthUserContext;
