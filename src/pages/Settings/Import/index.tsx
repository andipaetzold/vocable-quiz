import { Card as AntCard } from "antd";
import i18n from "../../../i18n";
import { useState } from "react";
import ImportTable from "./ImportTable";
import { Database } from "./types";
import Upload from "./Upload";

export default function Import() {
    let [database, setDatabase] = useState<Database | undefined>(undefined);

    return (
        <AntCard title={i18n.t("pages.import.title")}>
            {database ? <ImportTable database={database} /> : <Upload onSelect={setDatabase} />}
        </AntCard>
    );
}
