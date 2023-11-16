import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import storage from 'src/helpers/storage';

const loadUserInfo = async () => {
  try {
    const userInfo = await storage.load({key: 'userInfo'});
    // 在这里处理获取到的用户信息
    return userInfo.token
  } catch (error) {
    // 处理错误
    
    //console.error(error);
  }
  return false
};


export class HttpAxios {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      async (req: InternalAxiosRequestConfig) => {
        const token:any = await loadUserInfo();
        
        if (token) {
          req.headers.Authorization = token || "";
        }
        return req;
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: AxiosError) => {
        if (err.response && err.response.status === 401) {
          // 重新登录
        }
        return Promise.reject(err.response);
      },
    );
  }

  public get<R, P = any>(url: string, config?: AxiosRequestConfig<P>): Promise<R> {
    return this.instance.get(url, config);
  }

  public post<R, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.post(url, data, config);
  }
}

export type ApiResult<T> = {
  code: number;
  message: string;
  result: T;
};

const httpAxios = new HttpAxios({ baseURL: "", timeout: 60000 });

export default httpAxios;


