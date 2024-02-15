import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginrequest: (state,{payload}) => {
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
  },
  //   extraReducers: {},
});
export const {loginrequest, loginSuccess, loginFailure} = authSlice.actions;
export default authSlice.reducer;
