import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import thunk from 'redux-thunk';
import counterReducer from './redux/slices/counterSlice';
import cartReducer from './redux/slices/cartSlice';
import authReducer from './redux/slices/authSlice';

import {createLogger} from 'redux-logger';
import reduxStorage from './reduxStorage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';
import {pokemonApi} from './redux/services/pokemonApi';

const sagaMiddleware = createSagaMiddleware();
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartReducer,
  auth:authReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   middleware: [thunk],
  //   devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger, sagaMiddleware, pokemonApi.middleware),
  ],
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
