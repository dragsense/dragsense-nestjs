import { Routes } from '@angular/router';
import { ROUTES } from '../config/routes.config';

export const authRoutes: Routes = [
  {
    path: ROUTES.auth.login,
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: ROUTES.auth.register,
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: ROUTES.auth.forgot,
    loadComponent: () =>
      import('./forgot/forgot.component').then((m) => m.ForgotComponent),
  },
  {
    path: ROUTES.auth.reset,
    loadComponent: () =>
      import('./reset/reset.component').then((m) => m.ResetComponent),
  },
  { path: '', redirectTo: ROUTES.auth.login, pathMatch: 'full' },
];
