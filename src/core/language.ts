import languages from '../languages';

class Language {
    private languages: object;

    constructor(lang: string = 'en') {
        this.setLanguage(lang);
    }

    private setLanguage = (lang: string): void => {
        this.languages = (languages as { [key: string]: any })[lang];
    };

    public trans = (keys: string): string => {
        let localLang: any = this.languages;
        const key: Array<string> = keys.split('.');

        for (let i = 0; i < key.length; i += 1) {
            localLang = localLang[key[i]];
        }
        const result: string = localLang;
        return result;
    };
}

export default Language;
