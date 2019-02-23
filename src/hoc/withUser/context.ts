import React from "react";

const UserContext = React.createContext<firebase.User | undefined>(undefined);
export default UserContext;
