import { Breadcrumb, Button, Card } from "antd";
import useSubject from "hooks/useSubject";
import useUser from "hooks/useUser";
import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import CardsList from "./CardsList";
import { Trans } from "react-i18next";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function EditCards({ match, history }: Props) {
    const user = useUser();

    const { loading, subject } = useSubject(match.params.subjectId);

    return (
        <Card
            title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/edit">
                            <Trans i18nKey="subject.plural.big" />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{subject && subject.name}</Breadcrumb.Item>
                </Breadcrumb>
            }
            loading={loading}
        >
            {subject && (
                <>
                    <Button type="primary" style={{ marginBottom: "10px" }} onClick={() => history.push(`/edit/${subject.id}/create`)}>
                        <Trans i18nKey="pages.editcards.create" />
                    </Button>
                    <CardsList subject={subject} user={user} />
                </>
            )}
        </Card>
    );
}
