import { environment } from '../environments/environment';
import { ApiEndpointsType } from '../types/endpoints.type';

const getApiUrl = (path: string): string => `${environment.BASE_URL}${path}`;

export const API: ApiEndpointsType = {
  auth: {
    login: getApiUrl('/auth/login'),
    forgot: getApiUrl('/auth/forgot'),
    reset: getApiUrl('/auth/reset'),
  },
  users: {
    register: getApiUrl('/users/register'),
  },
  projects: {
    list: getApiUrl('/projects'),
  },
};
