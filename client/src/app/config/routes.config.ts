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
    project: {
      base: 'project',
      overview: 'overview',
      pages: {
        base: 'pages',
        all: 'list',
        single: 'page',
      },
      components: {
        base: 'components',
        all: 'list',
        single: 'component',
      },
      collections: {
        base: 'collections',
        all: 'list',
        single: 'collection',
      },
      forms: {
        base: 'forms',
        all: 'list',
        single: 'form',
      },
      media: 'media',
      code: 'code',
      styles: 'styles',
      settings: 'settings',
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
  },
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
  Project = 'project',
  Teams = 'teams',
  Themes = 'themes',
  Apps = 'apps',
}

export enum ProjectsRouteType {
  List = 'projects',
  Single = 'project',
}

export enum ProjectRouteType {
  Overview = 'overview',

  PageList = 'pages',
  PageSingle = 'page',

  ComponentList = 'components',
  ComponentSingle = 'component',

  CollectionList = 'collections',
  CollectionSingle = 'collection',

  FormList = 'forms',
  FormSingle = 'form',

  Media = 'media',
  Code = 'code',
  Styles = 'styles',
  Settings = 'settings',
}
