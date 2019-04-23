import React from "react";
import ChangeData from "./ChangeData";
import ChangePassword from "./ChangePassword";
import Import from "./Import";

export default class Settings extends React.PureComponent {
    render() {
        return (
            <>
                <div style={{ marginBottom: "20px" }}>
                    <ChangeData />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <ChangePassword />
                </div>
                <Import />
            </>
        );
    }
}
