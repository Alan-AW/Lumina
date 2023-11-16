/// <reference path="./auth.d.ts" />
import httpAxios from "../helpers/http";

export function checkVersion(payload: CheckVersionPayload) {
  return httpAxios.get<CheckVersionResponse>("https://uat-store.midland.com.hk/api/apps/version2.json", {
    params: payload,
  });
}

export function getUserInfo(payload: GetUserInfoPayload) {
  return httpAxios.get<GetUserInfoResponse>("", { params: payload });
}

export function lockDevice(payload: LockDevicePayload) {
  return httpAxios.post<LockDeviceResponse>("", payload);
}

export function loginIn(payload: LoginInPayload) {
  return httpAxios.post<LoginInResponse>("", payload);
}
