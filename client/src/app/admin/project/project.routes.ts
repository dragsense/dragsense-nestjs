import { Routes } from '@angular/router';
import { ROUTES } from '../../config/routes.config';
import { pageRoutes } from './pages/page.routes';

export const projectRoutes: Routes = [
  {
    path: ROUTES.admin.project.overview,
    loadComponent: () =>
      import('./overview/overview.component').then((m) => m.OverviewComponent),
  },
  {
    path: ROUTES.admin.project.pages.base,
    loadComponent: () =>
      import('./pages/pages.component').then((m) => m.PagesComponent),
    children: pageRoutes,
  },

  { path: '', redirectTo: ROUTES.admin.project.overview, pathMatch: 'full' },
];
