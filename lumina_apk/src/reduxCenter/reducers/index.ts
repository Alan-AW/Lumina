import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import configReducer from "./configReducer";
import refeshReducer from "./refreshReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  config:configReducer,
  refesh:refeshReducer
});

export default rootReducer;
