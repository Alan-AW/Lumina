import { createReducer } from "@reduxjs/toolkit";
import { APP_STARTUP_STEP } from "src/constants/auth";
import { loginInSuccess } from "../actionCreators";
import { registerRefresh, uppdateRefresh } from "../actionCreators/refreshAction";

export interface AuthState {
    refresh: any,
    lists: any[],
}

const initialState: AuthState = {
    refresh: {},
    lists: [],
};

const userReducer = createReducer(initialState, builder => {
    builder.addCase(registerRefresh.type, (state, action: any) => {
        const attrName = action.payload;
        if (!state.lists.includes(attrName)) {
            state.refresh = {
                [attrName]: false,
            }
            state.lists.push(attrName)
        }
    });
    builder.addCase(uppdateRefresh.type, (state, action: any) => {
        const attr = action.payload;
        state.refresh = {
            [attr.routeKey]: attr.status,
        }
    });

});

export default userReducer;
