import {takeLatest, call,put} from 'redux-saga/effects';
import {LoginParams, loginIn, loginInSuccess} from '../actionCreators/login';
import * as Api from 'src/apis/login';
import data from '@react-navigation/native';


function* loginInSaga(action) {
  
//   const res = yield call(Api.loginIn, {
//     account: action.payload.account,
//     password: action.payload.password,
//   });
//   if (res && !res.status) {
//     yield call(ToastService.showToast, res.errs);
//     return;
//   }
//   yield put({type: loginInSuccess.type, payload: res.data});
//  yield put(NavigationService.navigate({ routeName: 'Home' }));
}

export default function* watchAuthSaga() {
  console.log('【Saga】authSagas register');

  yield takeLatest(loginIn.type, loginInSaga);
}
