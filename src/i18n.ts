import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translation: {
        subject: {
          singular: {
            small: "subject",
            big: "Subject"
          },
          plural: {
            small: "subjectsß",
            big: "Subjects"
          }
        },
        name: "Name",
        email: "Email Address",
        password: "Password",
        passwordRepeat: "Password Repeat",
        day: "{{count}} day",
        day_plural: "{{count}} days",
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
            today: "Today",
            go: "Go"
          },
          quiz: {
            reveal: "Reveal Answer",
            correct: "Correct",
            wrong: "Wrong",
            longterm: "Long-Term Memory"
          }
        }
      }
    },
    de: {
      translation: {
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
        actions: "Aktionen",
        day: "{{count}} Tag",
        day_plural: "{{count}} Tage",
        pages: {
          home: {
            title: "Hallo {{name}}",
            tolearn: "Zu lernende Karten",
            inphase6: "Karten in Phase 6",
            cardcount: "Anzahl der Karten"
          },
          shell: {
            home: "Home",
            quiz: "Quiz",
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
            today: "Heute",
            go: "Los"
          },
          quiz: {
            reveal: "Antwort aufdecken",
            correct: "Richtig",
            wrong: "Falsch",
            longterm: "Langzeitgedächtnis"
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
