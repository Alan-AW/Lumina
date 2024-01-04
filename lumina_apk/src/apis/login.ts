import httpAxios from "../helpers/http";
import { baseUrl } from "./config";

type LoginInPayload={
    account: string,
    password: string,
}
export function requestLogin(payload: LoginInPayload) {
  return httpAxios.post<any>(`${baseUrl}/auth/login`, payload);
}