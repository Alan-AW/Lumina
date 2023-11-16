import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import configReducer from "./configReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  config:configReducer
});

export default rootReducer;
