import {createSlice} from '@reduxjs/toolkit';
import storage from '../../helpers/storage';
import { navigationRef } from '../../navigation/rootNavigation';

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
  registerLoading: false,
  registerSuccess: false,
  registerfailure: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginrequest: (state, {payload}) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
      state.success = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    registerrequest: (state, {payload}) => {
      state.registerLoading = true;
    },
    registerSuccess: (state, action) => {
      state.registerLoading = false;
      state.registerSuccess = true;
      state.registerfailure = false;
    },
    registerFailure: (state, action) => {
      state.registerLoading = false;
      state.registerfailure = true;
      state.registerSuccess = false;
    },
  },
    extraReducers: (builder) =>  {
      builder.addCase(loginSuccess,(state,action)=>{
        console.log(action.payload,"ACTION");
      })
    },
});
export const {
  loginrequest,
  loginSuccess,
  loginFailure,
  registerFailure,
  registerSuccess,
  registerrequest,
} = authSlice.actions;
export default authSlice.reducer;
