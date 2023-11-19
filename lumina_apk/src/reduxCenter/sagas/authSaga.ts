import { takeLatest, call } from "redux-saga/effects";
import { startup } from "../actionCreators/authAction";
import * as Api from "src/apis/auth";

function* startupSaga() {
  try {
    const step1: boolean = yield call(checkVersion);
    if (!step1) throw "检查版本失败";

    console.warn("it's ok, step1 pass.");
  } catch (error) {
    console.warn("sorry, startupSaga failure.");
  }
}

function* checkVersion() {
  const params: CheckVersionPayload = {
    mam_package: "com.midlanduat.appstore",
    mam_version_code: "99",
    mam_version_name: "211118a",
    device_id: "72d0cbc7b477774e",
    type: "Android",
    package: "com.midland.lms",
    version_code: "99",
    version_name: "1.0.0",
  };
  try {
    const response: CheckVersionResponse = yield call(Api.checkVersion, params);
  
    return true;
  } catch (error) {
    console.warn(error);
    return false;
  }
}

export default function* watchAuthSaga() {

  yield takeLatest(startup.type, startupSaga);
}
