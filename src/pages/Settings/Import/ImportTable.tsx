import { Button, message, Table } from "antd";
import { format } from "date-fns";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import React from "react";
import Card from "types/Card";
import { Omit } from "utility-types";
import { Benutzer, Database, Karte, Thema } from "./types";

interface Props {
  database: Database;
}

export default function ImportTable({ database }: Props) {
  const user = useUser();
  const firebase = useFirebase();

  const handleImport = async (userName: string, subjectName: string) => {
    if (!database) {
      throw new Error("database is null or undefined");
    }

    const hide = message.loading("Please wait...", 0);

    const subjectRef = await firebase.createSubject(user, subjectName);

    const Karten = database[`Karten_${userName}`] as Karte[];
    Karten.filter(karte => karte.Thema === subjectName).forEach(karte =>
      firebase.importCard(user, subjectRef.id, {
        question: karte.Frage,
        answer: karte.Antwort,
        createdTimestamp: karte.Entstehung.time,
        updatedTimestamp: Date.now(),
        createdAt: format(karte.Entstehung.time, "YYYY-MM-DD"),
        nextQuiz: format(karte.NaechsteAbfrage.time, "YYYY-MM-DD"),
        phase: karte.Phase
      } as Omit<Card, "id">)
    );

    hide();
    message.success("Subject was imported");
  };

  return (
    <Table
      rowKey="key"
      dataSource={(database.Benutzer as Benutzer[]).flatMap(({ Benutzer }) => {
        if (!database) {
          throw new Error("Database is null or undefined");
        }

        return (database[`Thema_${Benutzer}`] as Thema[]).map(({ Thema }) => ({
          key: Benutzer + Thema,
          user: Benutzer,
          subject: Thema
        }));
      })}
      columns={[
        {
          title: "User",
          dataIndex: "user",
          key: "user"
        },
        {
          title: "Subject",
          dataIndex: "subject",
          key: "subject"
        },
        {
          title: "Actions",
          key: "action",
          render: ({ user, subject }) => (
            <Button onClick={() => handleImport(user, subject)}>Import</Button>
          )
        }
      ]}
    />
  );
}
