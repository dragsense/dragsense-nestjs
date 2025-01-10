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
    profile: 'profile',
    projects: {
      base: 'projects',
      list: 'list',
      single: 'single',
    },
    project: {
      base: 'project',
      overview: 'overview',
      pages: {
        base: 'pages',
        list: 'list',
        single: 'single',
      },
      components: {
        base: 'components',
        list: 'list',
        single: 'component',
      },
      collections: {
        base: 'collections',
        list: 'list',
        single: 'collection',
      },
      forms: {
        base: 'forms',
        list: 'list',
        single: 'form',
      },
      media: 'media',
      code: 'code',
      styles: 'styles',
      settings: 'settings',
    },
    teams: {
      base: 'teams',
      list: 'list',
      single: 'single',
    },
    themes: {
      base: 'themes',
      list: 'list',
      single: 'theme',
    },
    apps: {
      base: 'apps',
      list: 'list',
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
  Profile = 'profile',
  Projects = 'projects',
  Project = 'project',
  Teams = 'teams',
  Themes = 'themes',
  Apps = 'apps',
}

export enum ProjectsRouteType {
  List = 'projects',
  Single = 'single',
}

export enum TeamsRouteType {
  List = 'teams',
  Single = 'single',
}

export enum ProjectRouteType {
  Overview = 'overview',

  PageList = 'pages',
  PageSingle = 'single',

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
