import app from './languages/app';
import error from './languages/error';

class Language {
    private languages: object;

    constructor() {
        this.languages = {
            _core: {
                app,
                error,
            },
        };
    }

    public setLanguage(languages: object): void {
        this.languages = {
            ...this.languages,
            ...languages,
        };
    }

    public language = (keys: string): string => {
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
