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
// import authReducer from './redux/slices/authSlice';
import cartReducer from './redux/slices/cartSlice';
import {createLogger} from 'redux-logger';

import AsyncStorage from '@react-native-async-storage/async-storage';
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
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  cart:cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  //   middleware: [thunk],
  //   devTools: process.env.NODE_ENV !== 'production',
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store);
export default store;
