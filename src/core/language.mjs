import languanges from "../resources/language";

class Languange {
  constructor(lang) {
    this.values = languanges[lang];
  }

  trans = (keyString) => {
    let localLang = this.values;
    let key = keyString.split(".");

    for (let i = 0; i < key.length; i++) {
      localLang = localLang[key[i]];
    }

    return localLang;
  };
}

export default Languange;
