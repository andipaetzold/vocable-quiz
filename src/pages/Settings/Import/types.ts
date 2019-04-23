export interface Database {
    Benutzer: Benutzer[];

    [key: string]: Thema[] | Karte[] | Benutzer[];
}

export interface Thema {
    Thema: string;
}

export interface Benutzer {
    Benutzer: string;
}

export interface Zeitpunkt {
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

export interface Karte {
    Antwort: string;
    Entstehung: Zeitpunkt;
    Frage: string;
    LetzteAbfrage: Zeitpunkt;
    NaechsteAbfrage: Zeitpunkt;
    Phase: number;
    Thema: string;
    ZusatzAngabe: string;
}
