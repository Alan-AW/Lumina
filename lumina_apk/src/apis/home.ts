import httpAxios from "../helpers/http";
import { baseUrl } from "./config";


export function getIndexList(payload: any) {
  return httpAxios.get<any>("/android/company/room/unit/list", payload);
}


export function getLiveList(id: any) {
  const params:any=''
  return httpAxios.get<any>(`/android/unit/desc/${id}`, params);
}
type getSetting={
  id:any,
  language:string,
}
export function getSetting(params: getSetting) {
  return httpAxios.get<any>(`/android/get/unit/settings/${params.id}`, {});
}

export function submitAdmin(params:any) {
  console.log('请求参数',params);
  
  return httpAxios.post<any>(`/android/send/cmd/to/mq/${params.id}`, params.data);
}
//品类查询
export function getChoices() {
  return httpAxios.get<any>(`/android/cultivar/choices`, {});
}
//品类详细信息
export function getChoicesDetails(id:any) {
  return httpAxios.get<any>(`/android/algorithm/choices/${id}`, {});
}
//提交种植品类
export function submitChoices(params:any) {
  return httpAxios.post<any>(`/android/unit/cultivar/algorithm`, params);
}
//获取信息
export function getUpdates(id:any) {
  return httpAxios.get<any>(`/manager/get/unit/info/${id}`, {});
}

//修改  /android/update/unit/algorithm

