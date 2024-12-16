import { RoutesType } from '../types/routes.type';

export const ROUTES: RoutesType = {
  auth: {
    base: 'auth',
    login: 'login',
    register: 'register',
    forgot: 'forgot',
    reset: 'reset',
  },
  admin: {
    base: 'admin',
    dashboard: 'dashboard',
    projects: {
      base: 'projects',
      all: 'list',
      single: 'project',
    },
    teams: {
      base: 'teams',
      all: 'list',
      single: 'team',
    },
    themes: {
      base: 'themes',
      all: 'list',
      single: 'theme',
    },
    apps: {
      base: 'apps',
      all: 'list',
      single: 'app',
    },
  }
};



export enum AuthRouteType {
  Login = 'login',
  Register = 'register',
  Forgot = 'forgot',
  Reset = 'reset',
}

export enum AdminRouteType {
  Dashboard = 'dashboard',
  Projects = 'projects',
  Teams = 'teams',
  Themes = 'themes',
  Apps = 'apps',
}


export enum ProjectRouteType {
  List = 'projects',
  Single = 'project',
  
}
