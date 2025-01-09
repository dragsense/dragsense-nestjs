export interface SubRoutesType {
  base: string;
  list: string;
  single: string;
}

export interface RoutesType {
  auth: {
    base: string;
    login: string;
    register: string;
    forgot: string;
    reset: string;
  };
  admin: {
    base: string;
    dashboard: string;
    profile: string;
    project: {
      base: string;
      overview: string;
      pages: SubRoutesType;
      components: SubRoutesType;
      collections: SubRoutesType;
      forms: SubRoutesType;
      media: string;
      code: string;
      styles: string;
      settings: string;
    };
    projects: SubRoutesType;
    teams: SubRoutesType;
    themes: SubRoutesType;
    apps: SubRoutesType;
  };
}
