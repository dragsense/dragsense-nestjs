import { Routes } from '@angular/router';
import { ROUTES } from '../config/routes.config';
import { projectRoutes } from './project/project.routes';
import { projectsRoutes } from './projects/projects.routes';

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
    loadComponent: () =>
      import('./projects/projects.component').then((m) => m.ProjectsComponent),
    children: projectsRoutes,
  },
  { path: '', redirectTo: ROUTES.admin.dashboard, pathMatch: 'full' },
];
