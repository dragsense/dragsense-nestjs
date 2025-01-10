export interface ApiEndpointsType {
  auth: {
    base: string;
    login: string;
    forgot: string;
    reset: string;
    logout: string;
    resend: string;
    github: string
  };
  users: {
    base: string;
    register: string;
    profile: string;
    
  };
  projects: {
    base: string;
    list: string;
    create: string;
    update: string;
    delete: string;
  };

  teams: {
    base: string;
    list: string;
    create: string;
    update: string;
    delete: string;
  };
}