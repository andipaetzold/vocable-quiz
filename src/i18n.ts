import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translation: {
        card: {
          singular: {
            small: "Card",
            big: "Card"
          },
          plural: {
            small: "Cards",
            big: "Cards"
          }
        },
        subject: {
          singular: {
            small: "subject",
            big: "Subject"
          },
          plural: {
            small: "subjects",
            big: "Subjects"
          }
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
            cardcount: "Number of Cards"
          },
          shell: {
            home: "Home",
            quiz: "Quiz",
            edit: "Edit",
            settings: "Settings",
            logout: "Logout"
          },
          login: {
            title: "Login",
            submit: "Login"
          },
          register: {
            title: "Registration",
            submit: "Register"
          },
          quizlist: {
            title: "Quiz",
            go: "Go"
          },
          quiz: {
            reveal: "Reveal Answer",
            correct: "Correct",
            wrong: "Wrong",
            longterm: "Long-Term Memory"
          },
          changedata: {
            title: "Change Data",
            submit: "Save"
          },
          changepassword: {
            title: "Change Password",
            submit: "Change Password"
          },
          createsubject: {
            title: "Create Subject",
            name: "Name of the Subject",
            submit: "Create Subject"
          },
          createcard: {
            title: "Create Card"
          },
          editcards: {
            create: "Create Cards"
          }
        }
      }
    },
    de: {
      translation: {
        card: {
          singular: {
            small: "Karte",
            big: "Karte"
          },
          plural: {
            small: "Karten",
            big: "Karten"
          }
        },
        subject: {
          singular: {
            small: "Fach",
            big: "Fach"
          },
          plural: {
            small: "Fächer",
            big: "Fächer"
          }
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
            cardcount: "Anzahl der Karten"
          },
          shell: {
            home: "Home",
            quiz: "Abfrage",
            edit: "Bearbeiten",
            settings: "Einstellungen",
            logout: "Abmelden"
          },
          login: {
            title: "Anmeldung",
            submit: "Anmelden"
          },
          register: {
            title: "Registrierung",
            submit: "Registrieren"
          },
          quizlist: {
            title: "Quiz",
            go: "Los"
          },
          quiz: {
            reveal: "Antwort aufdecken",
            correct: "Richtig",
            wrong: "Falsch",
            longterm: "Langzeitgedächtnis"
          },
          changedata: {
            title: "Daten ändern",
            submit: "Speichern"
          },
          changepassword: {
            title: "Passwort ändern",
            submit: "Passwort ändern"
          },
          createsubject: {
            title: "Fach erstellen",
            name: "Name des Fachs",
            submit: "Fach erstellen"
          },
          createcard: {
            title: "Karte erstellen"
          },
          editcards: {
            create: "Karten erstellen"
          }
        }
      }
    }
  },
  lng: "de",
  fallbackLng: "de",
  debug: process.env.NODE_ENV === "development",

  interpolation: {
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
