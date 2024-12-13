const BASE_URL = 'http://localhost:3000';

export const api = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    forgot: `${BASE_URL}/auth/forgot`,
    reset: `${BASE_URL}/auth/reset`,
  },
  users: {
    register: `${BASE_URL}/users/register`,
  },
};
