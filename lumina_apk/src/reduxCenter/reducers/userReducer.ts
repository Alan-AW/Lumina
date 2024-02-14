import { createReducer } from "@reduxjs/toolkit";
import { APP_STARTUP_STEP } from "src/constants/auth";
import { loginInSuccess } from "../actionCreators";

export interface AuthState {
  userInfo:any
}

const initialState: AuthState = {
    userInfo:{}
};

const userReducer = createReducer(initialState, builder => {
    builder.addCase(loginInSuccess.type, (state, action:any) => {
        state.userInfo = action.payload;
    });
});

export default userReducer;
