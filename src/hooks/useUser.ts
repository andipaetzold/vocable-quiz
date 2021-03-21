import AuthUserContext from "../hoc/withAuthUser/context";
import { useContext } from "react";

export default function useUser() {
    const user = useContext(AuthUserContext);

    if (!user) {
        throw new Error("User is undefined");
    }

    return user;
}
