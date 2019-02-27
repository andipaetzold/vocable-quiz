import { Button, Card as AntCard, Icon, Table, message } from "antd";
import { format } from "date-fns";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import i18n from "i18n";
import React, { FormEvent, useRef, useState } from "react";
import { Trans } from "react-i18next";
import Card from "types/Card";
import { Omit } from "utility-types";

interface Database {
  Benutzer: Benutzer[];

  [key: string]: Thema[] | Karte[] | Benutzer[];
}

interface Thema {
  Thema: string;
}

interface Benutzer {
  Benutzer: string;
}

interface Zeitpunkt {
  date: number;
  day: number;
  hours: number;
  minutes: number;
  month: number;
  seconds: number;
  time: number;
  timezoneOffset: number;
  year: number;
}

interface Karte {
  Antwort: string;
  Entstehung: Zeitpunkt;
  Frage: string;
  LetzteAbfrage: Zeitpunkt;
  NaechsteAbfrage: Zeitpunkt;
  Phase: number;
  Thema: string;
  ZusatzAngabe: string;
}

export default function Import() {
  const ref = useRef<HTMLInputElement>(null);
  let [database, setDatabase] = useState<Database | undefined>(undefined);
  const user = useUser();
  const firebase = useFirebase();

  const handleClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!ref.current) {
      return;
    }

    ref.current.click();
  };

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.currentTarget.files;
    if (!files) {
      return;
    }
    const file = files[0];

    const result = await new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          resolve(reader.result as string);
        },
        false
      );
      reader.readAsText(file);
    });

    setDatabase(JSON.parse(result));
  };

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
    <AntCard title={i18n.t("pages.import.title")}>
      <input
        type="file"
        ref={ref}
        accept="*.mdb"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <Button onClick={handleClick}>
        <Icon type="upload" /> <Trans i18nKey="pages.import.select" />
      </Button>

      {database && (
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
    </AntCard>
  );
}
