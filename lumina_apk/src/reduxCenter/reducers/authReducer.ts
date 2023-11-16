import { createReducer } from "@reduxjs/toolkit";
import { APP_STARTUP_STEP } from "src/constants/auth";

export interface AuthState {
  startupState: keyof typeof APP_STARTUP_STEP;
  appStoreInfo: null;
  appInfo: null;
  appStoreToken: string | null;
  appToken: string | null;
  userInfo: null;
  authExpire: string | null;
  appReady: boolean;
}

const initialState: AuthState = {
  startupState: "step1",
  appStoreInfo: null,
  appInfo: null,
  appStoreToken: null,
  appToken: null,
  userInfo: null,
  authExpire: null,
  appReady: false,
};

const authReducer = createReducer(initialState, builder => {
 
});

export default authReducer;
