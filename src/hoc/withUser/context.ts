import React from "react";
import User from "types/User";

const UserContext = React.createContext<User | undefined>(undefined);
export default UserContext;
