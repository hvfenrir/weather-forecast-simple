import Axios from "axios";

import { baseApiUrl } from 'config/api';

export const buildHeaders = (
  option = {
    contentType: 'application/json',
    accept: 'application/json',
    allowMethods: 'GET,PUT,POST,DELETE,OPTIONS',
  }
) => {
  return {
    'Content-Type': option.contentType,
    Accept: option.accept,
  };
}

export const callAPI = async ({ url, method, data, params }) => {
  const headers = buildHeaders();
  
  return await Axios({
    baseURL: baseApiUrl,
    headers,
    url,
    method,
    data,
    params
  });
};