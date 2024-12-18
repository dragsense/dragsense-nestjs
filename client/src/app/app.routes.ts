import { Routes } from '@angular/router';
import { ROUTES } from './config/routes.config';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {
    path: ROUTES.auth.base,
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: ROUTES.admin.base,
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
  { path: '', redirectTo: ROUTES.admin.base, pathMatch: 'full' },
];
