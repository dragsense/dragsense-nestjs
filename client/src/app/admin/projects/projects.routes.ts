import { Routes } from '@angular/router';
import { ROUTES } from '../../config/routes.config';

export const projectsRoutes: Routes = [
  {
    path: ROUTES.admin.projects.list,
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
  {
    path: ROUTES.admin.projects.single,
    loadComponent: () =>
      import('./single/single.component').then((m) => m.SingleComponent),
  },
  { path: '', redirectTo: ROUTES.admin.projects.list, pathMatch: 'full' },
];
