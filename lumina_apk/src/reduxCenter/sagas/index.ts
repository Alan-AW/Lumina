import { fork } from "redux-saga/effects";

import authSaga from "./authSaga";
import loginSaga from "./loginSaga";


export default function* rootSaga() {
  yield fork(authSaga,);
  yield fork(loginSaga,);
  
}
