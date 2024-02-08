import axios from 'axios';
import {baseURL} from './config';

const apiInstance = axios.create({
  baseURL: baseURL,
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

export const getData = (path, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data, status} = await apiInstance.get(path, {params});
      console.log(data);
      if (status == 200) {
        resolve(handleResponse(data));
      }
      resolve([]);
    } catch (error) {
      reject(handleError(error));
    }
  });
};
export const getDatadiff = async (path, params) => {
  return await apiInstance
    .get(path, {params})
    .then(({data}) => data)
    .catch(err => {
      throw axiosErrorToError(err);
    });
};
export const axiosErrorToError = err => {
  return new Error(`${err.message}: ${JSON.stringify(err.response?.data)}`);
};
