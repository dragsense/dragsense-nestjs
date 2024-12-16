import { Injectable } from '@angular/core';
import {
  ROUTES,
  AuthRouteType,
  AdminRouteType,
  ProjectRouteType,
} from './config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  readonly ROUTES = ROUTES;

  getAuthPath(type?: AuthRouteType): string {
    switch (type) {
      case AuthRouteType.Login:
        return `/${ROUTES.auth.base}`;
      case AuthRouteType.Register:
        return `/${ROUTES.auth.base}/${ROUTES.auth.register}`;
      case AuthRouteType.Forgot:
        return `/${ROUTES.auth.base}/${ROUTES.auth.forgot}`;
      case AuthRouteType.Reset:
        return `/${ROUTES.auth.base}/${ROUTES.auth.reset}`;
      default:
        return `/${ROUTES.auth.base}`;
    }
  }

  getAdminPath(type?: AdminRouteType): string {
    switch (type) {
      case AdminRouteType.Dashboard:
        return `/${ROUTES.admin.base}`;
      case AdminRouteType.Projects:
        return `/${ROUTES.admin.base}/${ROUTES.admin.projects.base}`;
      default:
        return `/${ROUTES.admin.base}`;
    }
  }

  getProjectsPath(type?: ProjectRouteType): string {
    switch (type) {
      case ProjectRouteType.List:
        return `${this.getAdminPath(AdminRouteType.Projects)}`;
      case ProjectRouteType.Single:
        return `${this.getAdminPath(AdminRouteType.Projects)}/${ROUTES.admin.projects.single}`;
      default:
        return this.getAdminPath(AdminRouteType.Projects);
    }
  }
}
