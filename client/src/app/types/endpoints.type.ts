export interface ApiEndpointsType {
  auth: {
    login: string;
    forgot: string;
    reset: string;
  };
  users: {
    register: string;
  };
  projects: {
    list: string;
  };
}