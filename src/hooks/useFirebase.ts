import { useContext } from "react";
import FirebaseContext from "../components/Firebase/context";

export default function useFirebase() {
    const firebase = useContext(FirebaseContext);

    if (!firebase) {
        throw new Error("Firebase is undefined");
    }

    return firebase;
}
