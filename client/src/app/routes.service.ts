import { Injectable } from '@angular/core';
import { ROUTES } from './config/routes.config';
import { AuthType, AdminType } from './types/routes.type';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  readonly ROUTES = ROUTES;

  getAuthPath(type?: AuthType): string {
    switch (type) {
      case AuthType.Login:
        return `/${ROUTES.auth.base}/${ROUTES.auth.login}`;
      case AuthType.Register:
        return `/${ROUTES.auth.base}/${ROUTES.auth.register}`;
      case AuthType.Forgot:
        return `/${ROUTES.auth.base}/${ROUTES.auth.forgot}`;
      case AuthType.Reset:
        return `/${ROUTES.auth.base}/${ROUTES.auth.reset}`;
      default:
        return `/${ROUTES.auth.base}`;
    }
  }

  getAdminPath(type?: AdminType): string {
    switch (type) {
      case AdminType.Dashboard:
        return `/${ROUTES.admin.base}/${ROUTES.admin.dashboard}`;
      case AdminType.Projects:
        return `/${ROUTES.admin.base}/${ROUTES.admin.projects}`;
      default:
        return `/${ROUTES.admin.base}`;
    }
  }

  getDefaultPath(): string {
    return ROUTES.default.redirectTo;
  }
}
