import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { ROUTES } from './config/routes.config';
import { ProjectComponent } from './admin/projects/project/project.component';

const authRoutes: Routes = [
  { path: ROUTES.auth.login, component: LoginComponent },
  { path: ROUTES.auth.register, component: RegisterComponent },
  { path: ROUTES.auth.forgot, component: ForgotComponent },
  { path: ROUTES.auth.reset, component: ResetComponent },
  { path: '', redirectTo: ROUTES.auth.login, pathMatch: 'full' },
];

const projectRoutes: Routes = [
  { path: ROUTES.admin.projects.all, component: ProjectsComponent },
  { path: ROUTES.admin.projects.single, component: ProjectComponent },
  { path: '', redirectTo: ROUTES.admin.projects.all, pathMatch: 'full' },
];

const adminRoutes: Routes = [
  { path: ROUTES.admin.dashboard, component: AdminComponent },
  { path: ROUTES.admin.projects.base, children: projectRoutes },
  { path: '', redirectTo: ROUTES.admin.dashboard, pathMatch: 'full' },
];

export const routes: Routes = [
  {
    path: ROUTES.auth.base,
    children: authRoutes,
  },
  {
    path: ROUTES.admin.base,
    children: adminRoutes,
  },
  { path: '', redirectTo: ROUTES.admin.base, pathMatch: 'full' },
];
