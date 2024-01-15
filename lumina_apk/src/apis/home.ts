import httpAxios from "../helpers/http";
import { baseUrl } from "./config";


export function getIndexList(payload: any) {
  return httpAxios.get<any>("http://lumina.toriches.cn/android/zone/room/list", payload);
}


export function getLiveList(id: any) {
  const params:any=''
  return httpAxios.get<any>(`http://lumina.toriches.cn/android/unit/desc/${id}`, params);
}
type getSetting={
  id:any,
  language:string,
}
export function getSetting(params: getSetting) {
  return httpAxios.get<any>(`${baseUrl}/android/get/unit/settings/${params.id}?language=${params.language}`, {});
}

export function submitAdmin(params:any) {
  console.log('请求参数',params);
  
  return httpAxios.post<any>(`${baseUrl}/android/send/cmd/to/mq/${params.id}`, params.data);
}


