import { Routes } from '@angular/router';
import { ROUTES } from '../../../config/routes.config';

export const pageRoutes: Routes = [
  
      {
        path: ROUTES.admin.project.pages.list,
        loadComponent: () =>
          import('./list/list.component').then((m) => m.ListComponent),
      },
      {
        path: ROUTES.admin.project.pages.single,
        loadComponent: () =>
          import('./single/single.component').then((m) => m.SingleComponent),
      },
      {
        path: '',
        redirectTo: ROUTES.admin.project.pages.list,
        pathMatch: 'full',
      },
];
