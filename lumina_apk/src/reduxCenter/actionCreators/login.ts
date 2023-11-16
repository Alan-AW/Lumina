import { createAction } from "@reduxjs/toolkit";


export type LoginParams={
    account: string,
    password: string,
}

export const loginIn = createAction<LoginParams>("loginIn");
export const loginInSuccess = createAction("loginInSuccess");
