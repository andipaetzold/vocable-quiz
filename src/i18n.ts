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
