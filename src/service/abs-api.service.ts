import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Configuration, DefaultApi } from './rest-api';
import md5 from 'md5';
const localBasePath = 'http://' + location.hostname + ':3000';

interface AxiosRequestConfig2 extends AxiosRequestConfig {
  _retry?: boolean;
}
interface AxiosError2 {
  config: AxiosRequestConfig2;
  response: AxiosResponse;
}
// const liveBasePath = 'https://';
const sessionStorage: Storage = localStorage;
function getAxiosInstance() {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    (config) => {
      const access_token = sessionStorage.getItem('access-token') || 'none';
      const headers = config.headers as { Authorization?: string };
      headers['Authorization'] = `Bearer ${access_token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // Response interceptor for API calls
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError2) => {
      const originalRequest = error.config;
      if (error.response?.status === 402 && !originalRequest._retry) {
        originalRequest._retry = true;
        const response = await absApiService.refreshToken({
          refresh_token: sessionStorage.getItem('refresh-token') || 'none',
        });
        const access_token = (response?.data).accessToken || 'none';
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + String(access_token);
        sessionStorage.setItem('access-token', access_token);
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}

class ABSApiService extends DefaultApi {
  constructor() {
    super(new Configuration(), localBasePath, getAxiosInstance());
  }

  async loginUser(userName: string, password: string) {
    const response = await absApiService.login(userName, md5(password));
    if (response.status == 201) {
      sessionStorage.setItem('access-token', response.data.accessToken || '');
      sessionStorage.setItem(
        'refresh-token',
        String(response.data.refreshToken)
      );
      const user = await this.getProfile();
      return user.data;
    } else {
      [];
    }
  }

  async logoutUser() {
    try {
      await this.logout();
    } finally {
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
    }
  }

  async getCurrentUser() {
    const response = await this.getProfile();
    if (response.status == 200) {
      return response.data;
    }
  }

  async changePassword(pin: string) {
    const res = await this.changePin({
      password: md5(pin),
    });
    if (res.status != 200) {
      throw new Error(res.statusText);
    }
  }

  async verifyPassword(pin: string) {
    const res = await this.verifyPin(md5(pin));
    if (res.status == 200) {
      return res.data;
    }
    throw new Error(res.statusText);
  }
}

export const absApiService = new ABSApiService();
