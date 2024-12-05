import { Injectable } from '@angular/core';
import { AuthStorageKeys } from '@core/infra/utils/auth-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private lightMode = false;
  private mode: string = 'dark';

  constructor() {
    this.mode = localStorage.getItem(AuthStorageKeys.PREFERED_THEME) ?? 'dark';
    localStorage.setItem(AuthStorageKeys.PREFERED_THEME, `${this.mode}`);
    if(localStorage.getItem(AuthStorageKeys.PREFERED_THEME) == 'light'){
      this.lightMode = true;
      document.body.classList.toggle('light-theme', this.isLightMode());
    }
  }

  isLightMode(): boolean {
    return this.lightMode;
  }

  toggleThemeMode(): void {
    this.lightMode = !this.lightMode;
    this.lightMode == true ? this.mode = 'light' : this.mode = 'dark';
    localStorage.setItem(AuthStorageKeys.PREFERED_THEME, `${this.mode}`)
    document.body.classList.toggle('light-theme', this.isLightMode());
  }
}
