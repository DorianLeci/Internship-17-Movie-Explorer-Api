import axios, { AxiosError, type AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import LocalStorage from './helpers/LocalStorage';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

type ErrorResponse = AxiosError & {
  response: AxiosResponse<{
    statusCode: number;
    message: string;
    error: string;
  }>;
};

api.interceptors.response.use(
  (response) => camelcaseKeys(response.data, { deep: true }),
  (error: ErrorResponse) => {
    return Promise.reject(error.response.data.message || error.message);
  },
);

api.interceptors.request.use((config) => {
  const token = LocalStorage.getAccessToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
