import { Button } from "antd";
import { ChangeEvent, MouseEvent, useRef } from "react";
import { Trans } from "react-i18next";
import { Database } from "./types";

interface Props {
    onSelect: (database: Database) => void;
}

export default function Upload({ onSelect }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!ref.current) {
            return;
        }

        ref.current.click();
    };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

        onSelect(JSON.parse(result));
    };

    return (
        <>
            <input type="file" ref={ref} accept="*.mdb" style={{ display: "none" }} onChange={handleChange} />

            <Button onClick={handleClick} icon="upload">
                <Trans i18nKey="pages.import.select" />
            </Button>
        </>
    );
}
