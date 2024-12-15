import { environment } from '../environments/environment';

const getApiUrl = (path: string): string => `${environment.BASE_URL}${path}`;

export interface ApiEndpoints {
  auth: {
    login: string;
    forgot: string;
    reset: string;
  };
  users: {
    register: string;
  };
  projects: {
    all: string;
  };
}

export const API: ApiEndpoints = {
  auth: {
    login: getApiUrl('/auth/login'),
    forgot: getApiUrl('/auth/forgot'),
    reset: getApiUrl('/auth/reset'),
  },
  users: {
    register: getApiUrl('/users/register'),
  },
  projects: {
    all: getApiUrl('/projects'),
  },
};
