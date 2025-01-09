import { Injectable } from '@angular/core';
import { ThemingService } from '@fundamental-ngx/core/theming';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private isDarkMode = false;
  constructor(private themingService: ThemingService) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) this.themingService.setTheme('ds_horizon_dark');
    else this.themingService.setTheme('ds_horizon');
  }

  setThemeMode(mode: string = 'light') {
    if (mode === 'dark') this.setDark();
    else this.setLight();
  }

  private setLight() {
    this.isDarkMode = false;
    this.themingService.setTheme('ds_horizon');
  }

  private setDark() {
    this.isDarkMode = true;
    this.themingService.setTheme('ds_horizon_dark');
  }

  getDarkModeStatus(): boolean {
    return this.isDarkMode;
  }
}
