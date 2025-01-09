import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideTheming,
  themingInitializer,
} from '@fundamental-ngx/core/theming';
import { authInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideAnimations(),
    provideTheming({
      defaultTheme: 'ds_horizon',
      defaultFontFile: 'sap_horizon',
      customThemes: [
        {
          id: 'ds_horizon',
          description: 'DS Morning Horizon',
          name: 'DS Morning Horizon',
          theming: {
            themingBasePath: 'assets/theming-base/ds_horizon/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_horizon.css',
          },
        },
        {
          id: 'ds_horizon_dark',
          description: 'DS Evening Horizon',
          name: 'DS Evening Horizon',
          theming: {
            themingBasePath:
              'assets/theming-base/ds_horizon_dark/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_horizon_dark.css',
          },
        },
      ],
      changeThemeOnQueryParamChange: true,
    }),
    themingInitializer(),
  ],
};
