import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {loginFailure, loginSuccess, loginrequest} from '../slices/authSlice';
import {getData, getDatadiff} from '../../api';

function callGetRequest(url, data) {
  return getData(url, data, true);
}

function* watchRequest() {
  while (true) {
    const {payload} = yield take(loginrequest);
    try {
      let response;
      response = yield call(callGetRequest, payload);
      yield put(loginSuccess(response));
    } catch (ex) {
      yield put(loginFailure(ex));
    }
  }
}

export default function* auth() {
  yield fork(watchRequest);
  //   yield takeLatest(loginrequest.type, watchRequest);
}
