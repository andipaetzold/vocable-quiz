import { Alert, Button, Card, Form, Input } from "antd";
import firebase from "firebase/app";
import AuthUserContext from "../../../hoc/withAuthUser/context";
import { FormEvent, useContext, useState } from "react";
import i18n from "../../../i18n";
import { Trans } from "react-i18next";

export default function ChangeData() {
    const user = useContext(AuthUserContext);

    if (!user) {
        throw Error("Something went wrong");
    }

    const [name, setName] = useState<string>(user.displayName || "");
    const [email, setEmail] = useState<string>(user.email || "");
    const [code, setCode] = useState<string | undefined>(undefined);

    if (!user) {
        return null;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await user.updateEmail(email);
            await user.updateProfile({ displayName: name, photoURL: null });

            setCode("success");
        } catch (e) {
            setCode((e as firebase.FirebaseError).code);
        }
    };

    if (code === "success") {
        return <Alert type="success" message="The data was change successfully" />;
    }

    return (
        <Card title={<Trans i18nKey="pages.changedata.title" />}>
            {code && <Alert type="error" message={code} />}
            <Form layout="horizontal" onSubmit={handleSubmit}>
                <Form.Item>
                    <Input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        placeholder={i18n.t("name")}
                        value={name}
                        autoComplete="name"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        placeholder={i18n.t("email")}
                        value={email}
                        autoComplete="username"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        <Trans i18nKey="pages.changedata.submit" />
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}
