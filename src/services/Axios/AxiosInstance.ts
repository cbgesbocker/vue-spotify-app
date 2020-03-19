import axios from 'axios';

export default class AxiosInstance {
  protected axiosInstance: any;

  constructor(config: object, interceptors: {request: any[]; response: any[] }) {
    this.axiosInstance = axios.create(config);
    this.applyInterceptors(interceptors);
  }

  applyInterceptors(interceptors: {request: any[]; response: any[] }) {
    interceptors.request.forEach((callback: any) => {
      this.axiosInstance.interceptors.request.use(callback);
    });

    interceptors.response.forEach((callback: any) => {
      this.axiosInstance.interceptors.response.use(callback);
    });
  }
}
