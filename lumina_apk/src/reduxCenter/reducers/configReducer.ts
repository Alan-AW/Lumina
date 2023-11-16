import { createReducer } from "@reduxjs/toolkit";
import { APP_STARTUP_STEP } from "src/constants/auth";
import { updateMenuStatus } from "../actionCreators";

export interface ConfigState {
  isHiddenSlider:boolean
}

const initialState: ConfigState = {
    isHiddenSlider:false
};

const userReducer = createReducer(initialState, builder => {
    builder.addCase(updateMenuStatus.type, (state, action:any) => {
        console.log('recuder 状态',action.payload);
        
        state.isHiddenSlider = action.payload;
    });
});

export default userReducer;
