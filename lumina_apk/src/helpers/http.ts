import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import storage from 'src/helpers/storage';
import { LANGUAGE } from "src/constants/lanaguses";
import { baseUrl } from "src/apis/config";
import ToastService from "./toast";
import { locales } from "./localesText";
import { auth_store } from "src/store/authStore";
import { ToastAndroid } from "react-native";
//获取当前语言环境




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
        // const token:any = await loadUserInfo();
        
        req.headers.Authorization = auth_store.token || "";

        return req;
      },
      (err: AxiosError) => {
        // ToastService.showToast(locales.requestError)
        return Promise.reject(err);
      },
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log('请求结果',res.data);
        const data=res.data;
        if (data && typeof data.errs === 'string' && data.errs) {
          ToastAndroid.show(JSON.stringify(data.errs),3000)
        }
        
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
const language=`?language=${auth_store.language}`

console.log('请求地址',baseUrl+url+language);
    
    return this.instance.get(baseUrl+url+language, config);
  }

  public post<R, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
const language=`?language=${auth_store.language}`

console.log('请求地址',baseUrl+url+language);

    return this.instance.post(baseUrl+url+language, data, config);
  }
}

export type ApiResult<T> = {
  code: number;
  message: string;
  result: T;
};

const httpAxios = new HttpAxios({ baseURL: "", timeout: 60000 });

export default httpAxios;


