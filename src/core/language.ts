import languages from '../resources/language';

class Language {
  private values: string;

  constructor(lang: string = 'en') {
    this.values = (languages as { [key: string]: any})[lang];
  }

  public trans = (keys: string): string => {
    let localLang: any = this.values;
    const key: Array<string> = keys.split('.');

    for (let i = 0; i < key.length; i += 1) {
      localLang = localLang[key[i]];
    }
    const result: string = localLang;
    return result;
  };
}

export default Language;