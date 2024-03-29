import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translation: {
                error: {
                    title: "An error occurred",
                    message: "Something went wrong. Andi just received a message and will fix the issue as soon as possible",
                    reload: "Reload",
                },
                card: {
                    singular: {
                        small: "Card",
                        big: "Card",
                    },
                    plural: {
                        small: "Cards",
                        big: "Cards",
                    },
                },
                subject: {
                    singular: {
                        small: "subject",
                        big: "Subject",
                    },
                    plural: {
                        small: "subjects",
                        big: "Subjects",
                    },
                },
                name: "Name",
                email: "Email Address",
                password: "Password",
                passwordRepeat: "Password Repeat",
                passwordCurrent: "Current Password",
                passwordNew: "New Password",
                day: "{{count}} day",
                day_plural: "{{count}} days",
                question: "Question",
                answer: "Answer",
                remark: "Remark",
                create: "Create",
                edit: "Edit",
                delete: "Delete",
                today: "Today",
                phase: "Phase",
                nextquiz: "Next Quiz",
                pages: {
                    home: {
                        title: "Hello {{name}}",
                        tolearn: "Cards to Learn",
                        inphase6: "Cards in Phase 6",
                        cardcount: "Number of Cards",
                    },
                    shell: {
                        home: "Home",
                        quiz: "Quiz",
                        edit: "Edit",
                        settings: "Settings",
                        logout: "Logout",
                    },
                    login: {
                        title: "Login",
                        submit: "Login",
                    },
                    register: {
                        title: "Registration",
                        submit: "Register",
                    },
                    quizlist: {
                        title: "Quiz",
                        go: "Go",
                    },
                    quiz: {
                        reveal: "Reveal Answer",
                        correct: "Correct",
                        wrong: "Wrong",
                        longterm: "Long-Term Memory",
                    },
                    changedata: {
                        title: "Change Data",
                        submit: "Save",
                    },
                    changepassword: {
                        title: "Change Password",
                        submit: "Change Password",
                    },
                    createsubject: {
                        title: "Create Subject",
                        name: "Name of the Subject",
                        submit: "Create Subject",
                    },
                    editcard: {
                        title: "Update Card",
                        reverse: "Create reversed card",
                    },
                    editcards: {
                        create: "Create Cards",
                    },
                    import: {
                        title: "Import",
                        select: "Select file",
                    },
                },
            },
        },
        de: {
            translation: {
                error: {
                    title: "Ein Fehler ist aufgetreten",
                    message: "Irgendwas ist schief gelaufen. Andi weiß aber schon Bescheid.",
                    reload: "Seite neu laden",
                },
                card: {
                    singular: {
                        small: "Karte",
                        big: "Karte",
                    },
                    plural: {
                        small: "Karten",
                        big: "Karten",
                    },
                },
                subject: {
                    singular: {
                        small: "Fach",
                        big: "Fach",
                    },
                    plural: {
                        small: "Fächer",
                        big: "Fächer",
                    },
                },
                name: "Name",
                email: "E-Mail Adresse",
                password: "Passwort",
                passwordRepeat: "Password wiederholen",
                passwordCurrent: "Aktuelles Passwort",
                passwordNew: "Neues Passwort",
                actions: "Aktionen",
                day: "{{count}} Tag",
                day_plural: "{{count}} Tage",
                question: "Frage",
                answer: "Antwort",
                remark: "Anmerkung",
                create: "Erstellen",
                edit: "Bearbeiten",
                delete: "Löschen",
                today: "Heute",
                phase: "Phase",
                nextquiz: "Nächste Abfrage",
                pages: {
                    home: {
                        title: "Hallo {{name}}",
                        tolearn: "Zu lernende Karten",
                        inphase6: "Karten in Phase 6",
                        cardcount: "Anzahl der Karten",
                    },
                    shell: {
                        home: "Home",
                        quiz: "Abfrage",
                        edit: "Bearbeiten",
                        settings: "Einstellungen",
                        logout: "Abmelden",
                    },
                    login: {
                        title: "Anmeldung",
                        submit: "Anmelden",
                    },
                    register: {
                        title: "Registrierung",
                        submit: "Registrieren",
                    },
                    quizlist: {
                        title: "Quiz",
                        go: "Los",
                    },
                    quiz: {
                        reveal: "Antwort aufdecken",
                        correct: "Richtig",
                        wrong: "Falsch",
                        longterm: "Langzeitgedächtnis",
                    },
                    changedata: {
                        title: "Daten ändern",
                        submit: "Speichern",
                    },
                    changepassword: {
                        title: "Passwort ändern",
                        submit: "Passwort ändern",
                    },
                    createsubject: {
                        title: "Fach erstellen",
                        name: "Name des Fachs",
                        submit: "Fach erstellen",
                    },
                    editcard: {
                        title: "Karte aktualisieren",
                        reverse: "Umgedrehte Karte erstellen",
                    },
                    editcards: {
                        create: "Karten erstellen",
                    },
                    import: {
                        title: "Import",
                        select: "Datei auswählen",
                    },
                },
            },
        },
    },
    lng: "de",
    fallbackLng: "de",
    debug: process.env.NODE_ENV === "development",

    interpolation: {
        formatSeparator: ",",
    },

    react: {
        wait: true,
    },
});

export default i18n;
