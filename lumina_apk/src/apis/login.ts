import httpAxios from "../helpers/http";

type LoginInPayload={
    account: string,
    password: string,
}
export function requestLogin(payload: LoginInPayload) {
  return httpAxios.post<any>("http://lumina.toriches.cn/auth/login", payload);
}
