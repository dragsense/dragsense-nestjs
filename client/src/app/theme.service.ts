import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    const element = document.querySelector('html');
    if (element) element.classList.toggle('dragsense-app-dark');
  }

  getDarkModeStatus(): boolean {
    return this.isDarkMode;
  }
}
