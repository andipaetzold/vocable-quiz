import { Card, Col, Row, Statistic } from "antd";
import useSubjects from "../../hooks/useSubjects";
import useUser from "../../hooks/useUser";
import { Trans } from "react-i18next";

export default function Home() {
    const user = useUser();

    const { loading, subjects } = useSubjects();

    return (
        <Card title={<Trans i18nKey="pages.home.title" values={{ name: user.displayName }} />} loading={loading}>
            <Row>
                <Col span={6}>{subjects && <Statistic title={<Trans i18nKey="subject.plural.big" />} value={subjects.length} />}</Col>
                <Col span={6}>
                    {subjects && (
                        <Statistic
                            title={<Trans i18nKey="pages.home.tolearn" />}
                            value={subjects.map(s => s.cardsCount - (s.cardsPhase[6] || 0)).reduce((prev, cur) => prev + cur, 0)}
                        />
                    )}
                </Col>
                <Col span={6}>
                    {subjects && (
                        <Statistic
                            title={<Trans i18nKey="pages.home.inphase6" />}
                            value={subjects.map(s => s.cardsPhase[6] || 0).reduce((prev, cur) => prev + cur, 0)}
                        />
                    )}
                </Col>
                <Col span={6}>
                    {subjects && (
                        <Statistic
                            title={<Trans i18nKey="pages.home.cardcount" />}
                            value={subjects.map(s => s.cardsCount).reduce((prev, cur) => prev + cur, 0)}
                        />
                    )}
                </Col>
            </Row>
        </Card>
    );
}
