import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export type Language = "pt" | "en"

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private _translate: TranslateService) { }
  private currentLanguage: Language | null = this.initLang();

  initLang(): Language | null {
    const lang: string | null = localStorage.getItem("preferedLanguage")
    return <Language>lang
  }

  changeLanguage(language: Language) {
    if (language != null) {
      this._translate.use(language);
      localStorage.setItem("preferedLanguage", language);
      this.currentLanguage = language;
    }
    else {
      console.error('Invalid language selected: ' + language)
      localStorage.setItem("preferedLanguage", 'pt');
    }
    location.reload();
  }

  getLanguage(): Language | null {
    return this.currentLanguage;
  }

  getDaysSuffix(day: number) {
    switch (this.currentLanguage) {
      case 'pt':
        return day > 1 ? 'dias' : 'dia'
      case 'en':
        return day > 1 ? 'days' : 'day'
      default:
        return undefined;
    }
  }

  getOrdinalSuffix(day: number) {
    switch (this.currentLanguage) {
      case 'pt':
        return '°'
      case 'en': {
        // exception days
        if (day >= 11 && day <= 13) {
          return `th`;
        }
        switch (day % 10) {
          case 1:
            return `st`;
          case 2:
            return `nd`;
          case 3:
            return `rd`;
          default:
            return `th`;
        }
      };
      default:
        return undefined
    }
  }

  getOrdinalDays(day: number) {
    switch (this.currentLanguage) {
      case 'pt':
        return `${day}${this.getOrdinalSuffix(day)} dia`;
      case 'en':
        return `${day}${this.getOrdinalSuffix(day)} day`;
      default:
        return undefined;
    }
  }
}
