import { Routes } from '@angular/router';
import { ROUTES } from '../../config/routes.config';

export const projectRoutes: Routes = [
  {
    path: ROUTES.admin.project.overview,
    loadComponent: () =>
      import('./overview/overview.component').then((m) => m.OverviewComponent),
  },
  {
    path: ROUTES.admin.project.pages.base,
    children: [
      {
        path: ROUTES.admin.project.pages.all,
        loadComponent: () =>
          import('./pages/pages.component').then((m) => m.PagesComponent),
      },
      {
        path: ROUTES.admin.project.pages.single,
        loadComponent: () =>
          import('./pages/page/page.component').then((m) => m.PageComponent),
      },
      {
        path: '',
        redirectTo: ROUTES.admin.project.pages.all,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ROUTES.admin.project.components.base,
    children: [
      {
        path: ROUTES.admin.project.components.all,
        loadComponent: () =>
          import('./components/components.component').then(
            (m) => m.ComponentsComponent,
          ),
      },
      {
        path: '',
        redirectTo: ROUTES.admin.project.components.all,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ROUTES.admin.project.collections.base,
    children: [
      {
        path: ROUTES.admin.project.collections.all,
        loadComponent: () =>
          import('./collections/collections.component').then(
            (m) => m.CollectionsComponent,
          ),
      },
      {
        path: '',
        redirectTo: ROUTES.admin.project.collections.all,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ROUTES.admin.project.forms.base,
    children: [
      {
        path: ROUTES.admin.project.forms.all,
        loadComponent: () =>
          import('./forms/forms.component').then((m) => m.FormsComponent),
      },

      {
        path: '',
        redirectTo: ROUTES.admin.project.forms.all,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ROUTES.admin.project.media,
    loadComponent: () =>
      import('./media/media.component').then((m) => m.MediaComponent),
  },
  {
    path: ROUTES.admin.project.code,
    loadComponent: () =>
      import('./code/code.component').then((m) => m.CodeComponent),
  },
  {
    path: ROUTES.admin.project.styles,
    loadComponent: () =>
      import('./styles/styles.component').then((m) => m.StylesComponent),
  },
  {
    path: ROUTES.admin.project.settings,
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
  },
  { path: '', redirectTo: ROUTES.admin.project.overview, pathMatch: 'full' },
];
