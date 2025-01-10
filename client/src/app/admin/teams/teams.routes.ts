import { Routes } from '@angular/router';
import { ROUTES } from '../../config/routes.config';

export const teamsRoutes: Routes = [
  {
    path: ROUTES.admin.teams.list,
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
  {
    path: ROUTES.admin.teams.single,
    loadComponent: () =>
      import('./single/single.component').then((m) => m.SingleComponent),
  },
  { path: '', redirectTo: ROUTES.admin.teams.list, pathMatch: 'full' },
];
