import {fork, all} from 'redux-saga/effects';
import auth from './authSaga';
import cart from './cartSaga';

export default function* rootSaga() {
  yield all([fork(auth), fork(cart)]);
}
