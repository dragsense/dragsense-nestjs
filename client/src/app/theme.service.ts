import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeLinkElement: HTMLLinkElement;

  constructor() {
    this.themeLinkElement = document.getElementById(
      'app-theme',
    ) as HTMLLinkElement;
    if (!this.themeLinkElement) {
      this.themeLinkElement = document.createElement('link');
      this.themeLinkElement.rel = 'stylesheet';
      this.themeLinkElement.id = 'app-theme';
      this.themeLinkElement.href = 'dark-theme.css';
      document.head.appendChild(this.themeLinkElement);
    }
  }

  switchTheme(theme: 'light' | 'dark'): void {
    const themePath = `${theme}-theme.css`;
    this.themeLinkElement.href = themePath;
  }
}
