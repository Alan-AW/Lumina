// 检查版本
type CheckVersionPayload = {
  mam_package: string;
  mam_version_code: string;
  mam_version_name: string;
  device_id: string;
  type: "Android" | "IOS";
  package: string;
  version_code: string;
  version_name: string;
};
type CheckVersionResponse =
  | {
      status: boolean;
      mandatory: number;
      data: { download_url: string; [data_more: string]: any };
      mam_status: boolean;
      mam_mandatory: number;
      mam_data: { download_url: string; [mam_data_more: string]: any };
    }
  | { status: boolean; message: string; mam_status: boolean; mam_message: string };

// 获取用户信息
type GetUserInfoPayload = {
  access_token: string;
  appl: "mrlms";
  version: string;
  platform: "android" | "ios";
};
type GetUserInfoResponse =
  | {}
  | {
      status: boolean;
      message: string;
    };

// 锁定设备
type LockDevicePayload = {
  emp_id: string;
  platform: "A" | "I";
  devicekey: string;
  devicename: string;
};
type LockDeviceResponse = {};

// 登录
type LoginInPayload = {
  accessToken: string;
  device: {
    uuid: string;
    platform: "mobile";
    os: "android" | "ios";
  };
};
type LoginInResponse = {
  token: string;
};
