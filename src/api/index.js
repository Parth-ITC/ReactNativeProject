import axios from 'axios';
import {baseURL, fruitURL} from './config';

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
export const getDatadiff = async (path, params) => {
  return apiInstance
    .get(path, {params})
    .then(({data}) => data)
    .catch(err => {
      throw axiosErrorToError(err);
    });
};
export const axiosErrorToError = err => {
  return new Error(`${err.message}: ${JSON.stringify(err.response?.data)}`);
};
