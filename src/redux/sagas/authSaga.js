import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  loginFailure,
  loginSuccess,
  loginrequest,
  registerFailure,
  registerSuccess,
  registerrequest,
} from '../slices/authSlice';
import {getAuth, getData, getDatadiff, postAuth} from '../../api';
import {navigation} from '../../navigation/rootNavigation';
import storage from '../../helpers/storage';

function callGetRequest(url, data) {
  return getAuth(url, data);
}
function callPostRequest(url, data) {
  return postAuth(url, data);
}
function* watchLoginRequest() {
  while (true) {
    const {payload} = yield take(loginrequest);
    console.log(payload);
    const { callback } = payload;
    try {
      let response;
      response = yield call(callPostRequest, payload.url,payload.data);
      if (callback) callback(null, response);
      yield put(loginSuccess(response));
      if (response?.id) {
        payload.auth.signIn(response?.id);
      }
    } catch (err) {
      if (callback) callback(null, err);
      yield put(loginFailure(ex));
    }
  }
}

function* watchRegisterRequest() {
  while (true) {
    const {payload} = yield take(registerrequest);
    try {
      let response;
      response = yield call(callPostRequest, payload.url, payload.data);
      yield put(registerSuccess(response));
      console.log(response, 'RESPONSSE');
      if (response.id) {
        navigation.replace('Login');
        return true
      }
    } catch (ex) {
      yield put(registerFailure(ex));
    }
  }
}

export default function* auth() {
  yield fork(watchLoginRequest);
  yield fork(watchRegisterRequest);
  //   yield takeLatest(loginrequest.type, watchRequest);
}
