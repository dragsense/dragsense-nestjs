import { environment } from '../environments/environment';
import { ApiEndpointsType } from '../types/endpoints.type';

const getApiUrl = (path: string): string => `${environment.BASE_URL}${path}`;

export const API: ApiEndpointsType = {
  auth: {
    base: getApiUrl('/auth'),
    login: getApiUrl('/auth/login'),
    forgot: getApiUrl('/auth/forgot'),
    reset: getApiUrl('/auth/reset'),
    logout: getApiUrl('/auth/logout'),
    github:  getApiUrl('/auth/github'),
    resend:  getApiUrl('/auth/resend'),
  },
  users: {
    base: getApiUrl('/users'),
    register: getApiUrl('/users/register'),
    profile: getApiUrl('/users/profile'),
  },
  projects: {
    base: getApiUrl('/projects'),
    list: getApiUrl('/projects/list'),
    create: getApiUrl('/projects/create'),
    update: getApiUrl('/projects/update'),
    delete: getApiUrl('/projects/delete'),
  },
  teams: {
    base: getApiUrl('/teams'),
    list: getApiUrl('/teams/list'),
    create: getApiUrl('/teams/create'),
    update: getApiUrl('/teams/update'),
    delete: getApiUrl('/teams/delete'),
  },
};
