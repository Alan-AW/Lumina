import httpAxios from "../helpers/http";


export function getIndexList(payload: any) {
  return httpAxios.get<any>("http://lumina.toriches.cn/android/zone/room/list/1", payload);
}


export function getLiveList(id: any) {
  const params:any=''
  return httpAxios.get<any>(`http://lumina.toriches.cn/android/unit/desc/${id}`, params);
}
