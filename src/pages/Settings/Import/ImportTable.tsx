import { Button, message, Progress, Table } from "antd";
import { format } from "date-fns";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import React, { useState } from "react";
import Card from "types/Card";
import { Omit } from "utility-types";
import { Benutzer, Database, Karte, Thema } from "./types";

interface Props {
  database: Database;
}

export default function ImportTable({ database }: Props) {
  const user = useUser();
  const firebase = useFirebase();
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const handleImport = async (userName: string, subjectName: string) => {
    if (!database) {
      throw new Error("database is null or undefined");
    }

    setProgress(0);

    const hide = message.loading("Please wait...", 0);

    const subjectRef = await firebase.createSubject(user, subjectName);

    const Karten = database[`Karten_${userName}`] as Karte[];
    const cardsToImport: Omit<Card, "id">[] = Karten.filter(
      karte => karte.Thema === subjectName
    ).map(karte => ({
      question: karte.Frage || "",
      answer: karte.Antwort || "",
      remark: karte.ZusatzAngabe || "",
      createdTimestamp: karte.Entstehung.time,
      updatedTimestamp: Date.now(),
      createdAt: format(karte.Entstehung.time, "YYYY-MM-DD"),
      nextQuiz:
        karte.Phase < 6
          ? format(karte.NaechsteAbfrage.time, "YYYY-MM-DD")
          : null,
      phase: karte.Phase
    }));

    const importPromises = chunk(cardsToImport, 500).map(cards =>
      firebase.importCards(user, subjectRef.id, cards)
    );

    let i = 0;
    for await (const docRef of importPromises) {
      ++i;
      setProgress(Math.round((i / importPromises.length) * 100));
    }

    hide();
    message.success("Subject was imported");
  };

  return (
    <>
      {progress !== undefined ? (
        <Progress percent={progress} />
      ) : (
        <Table
          rowKey="key"
          dataSource={(database.Benutzer as Benutzer[]).flatMap(
            ({ Benutzer }) => {
              if (!database) {
                throw new Error("Database is null or undefined");
              }

              return (database[`Thema_${Benutzer}`] as Thema[]).map(
                ({ Thema }) => ({
                  key: Benutzer + Thema,
                  user: Benutzer,
                  subject: Thema
                })
              );
            }
          )}
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
                <Button onClick={() => handleImport(user, subject)}>
                  Import
                </Button>
              )
            }
          ]}
        />
      )}
    </>
  );
}

function chunk<T>(collection: T[], size: number): T[][] {
  var result = [];

  for (var x = 0; x < Math.ceil(collection.length / size); x++) {
    var start = x * size;
    var end = start + size;

    result.push(collection.slice(start, end));
  }

  return result;
}
