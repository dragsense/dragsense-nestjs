import { Injectable } from '@angular/core';
import {
  ROUTES,
  AuthRouteType,
  AdminRouteType,
  ProjectRouteType,
  ProjectsRouteType,
} from './config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  readonly ROUTES = ROUTES;

  getAuthPath(type?: AuthRouteType): string {
    const authase = ROUTES.auth;

    switch (type) {
      case AuthRouteType.Login:
        return `/${authase.base}`;
      case AuthRouteType.Register:
        return `/${authase.base}/${authase.register}`;
      case AuthRouteType.Forgot:
        return `/${authase.base}/${authase.forgot}`;
      case AuthRouteType.Reset:
        return `/${authase.base}/${authase.reset}`;
      default:
        return `/${authase.base}`;
    }
  }

  getAdminPath(type?: AdminRouteType): string {
    const adminBase = ROUTES.admin;

    switch (type) {
      case AdminRouteType.Dashboard:
        return `/${adminBase.base}`;
      case AdminRouteType.Projects:
        return `/${adminBase.base}/${adminBase.projects.base}`;
      case AdminRouteType.Project:
        return `/${adminBase.base}/${adminBase.project.base}`;
      default:
        return `/${adminBase.base}`;
    }
  }

  getProjectsPath(type?: ProjectsRouteType): string {
    const projectsPath = this.getAdminPath(AdminRouteType.Projects);
    const projectsBase = ROUTES.admin.projects;

    switch (type) {
      case ProjectsRouteType.List:
        return `${projectsPath}`;
      case ProjectsRouteType.Single:
        return `${projectsPath}/${projectsBase.single}`;
      default:
        return projectsPath;
    }
  }

  getProjectPath(type?: ProjectRouteType): string {
    const projectPath = this.getAdminPath(AdminRouteType.Project);
    const projectBase = ROUTES.admin.project;

    switch (type) {
      case ProjectRouteType.Overview:
        return `${projectPath}`;
      case ProjectRouteType.PageList:
        return `${projectPath}/${projectBase.pages.base}`;
      case ProjectRouteType.PageSingle:
        return `${projectPath}/${projectBase.pages.base}/${projectBase.pages.single}`;
      case ProjectRouteType.ComponentList:
        return `${projectPath}/${projectBase.components.base}`;
      case ProjectRouteType.ComponentSingle:
        return `${projectPath}/${projectBase.components.single}`;
      case ProjectRouteType.CollectionList:
        return `${projectPath}/${projectBase.collections.base}`;
      case ProjectRouteType.CollectionSingle:
        return `${projectPath}/${projectBase.collections.single}`;
      case ProjectRouteType.FormList:
        return `${projectPath}/${projectBase.forms.base}`;
      case ProjectRouteType.FormSingle:
        return `${projectPath}/${projectBase.forms.single}`;
      case ProjectRouteType.Media:
        return `${projectPath}/${projectBase.media}`;
      case ProjectRouteType.Code:
        return `${projectPath}/${projectBase.code}`;
      case ProjectRouteType.Styles:
        return `${projectPath}/${projectBase.styles}`;
      case ProjectRouteType.Settings:
        return `${projectPath}/${projectBase.settings}`;
      default:
        return projectPath;
    }
  }
}
