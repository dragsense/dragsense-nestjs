import { Routes } from '@angular/router';
import { ROUTES } from '../config/routes.config';
import { projectRoutes } from './project/project.routes';

export const adminRoutes: Routes = [
  {
    path: ROUTES.admin.dashboard,
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  { path: ROUTES.admin.project.base, children: projectRoutes },
  {
    path: ROUTES.admin.projects.base,
    children: [
      {
        path: ROUTES.admin.projects.all,
        loadComponent: () =>
          import('./projects/projects.component').then(
            (m) => m.ProjectsComponent,
          ),
      },
      {
        path: ROUTES.admin.projects.single,
        loadComponent: () =>
          import('./projects/project/project.component').then(
            (m) => m.ProjectComponent,
          ),
      },
      { path: '', redirectTo: ROUTES.admin.projects.all, pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: ROUTES.admin.dashboard, pathMatch: 'full' },
];
