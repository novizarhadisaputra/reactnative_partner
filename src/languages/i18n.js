import i18next from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";
import bahasa from './bahasa.json';
import english from './english.json';

i18next.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: english,
        id: bahasa
    },
    react: {
        useSuspense: false
    }
});

export default i18next;