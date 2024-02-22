import axios from 'axios';
import {authURL, baseURL, fruitURL} from './config';
import storage from '../helpers/storage';
import {select} from 'redux-saga/effects';

const apiInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const fruitapiInstance = axios.create({
  baseURL: fruitURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const authapiInstance = axios.create({
  baseURL: authURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const handleResponse = response => {
  return response ?? null;
};
const handleError = error => {
  if (error.response) {
    return error.response;
  } else if (error.request) {
    return {message: 'Timeout!'};
  } else {
    return error.message;
  }
};

export const getData = (path, params, isfruit) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isfruit) {
        const {data, status} = await fruitapiInstance.get(path, {params});
        console.log(data, status);
        if (status == 200) {
          resolve(handleResponse(data));
        }
      } else {
        const {data, status} = await apiInstance.get(path, {params});
        if (status == 200) {
          resolve(handleResponse(data));
        }
      }
      resolve([]);
    } catch (error) {
      console.log('+++++++++++', error);
      reject(handleError(error));
    }
  });
};
export const getAuth = async (path, params) => {
  return apiInstance
    .get(path, {params})
    .then(({data}) => data)
    .catch(err => {
      return err;
    });
};
export const getDatadiff = async (path, params) => {
  return authapiInstance
    .get(path, {params})
    .then(({data}) => data)
    .catch(err => {
      throw axiosErrorToError(err);
    });
};
export const postAuth = async (path, data, params) => {
  // const accessToken = yield select(state => state.auth.userInfo.userId);
  // let header = {}
  // if(accessToken){
  //   header={
  //     'X-Access-Token': accessToken,
  //   }
  // }
  // console.log(accessToken,'accessToken');
  return new Promise(async (resolve, reject) => {
    try {
      const response = await authapiInstance.post(path, data, {params});
      resolve(handleResponse(response.data));
    } catch (error) {
      reject(handleError(error));
    }
  });
  return authapiInstance
    .post(path, data, {params})
    .then(({data}) => data)
    .catch(err => {
      return err;
    });
};
export const axiosErrorToError = err => {
  return new Error(`${err.message}: ${JSON.stringify(err.response?.data)}`);
};
