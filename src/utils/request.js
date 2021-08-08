import Axios from "axios";

import { baseApiUrl } from 'config/api';

/**
 * Handles build headers for a request
 *
 * @returns {Object} Configuration of header
 */
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
/**
 * Handles async request by axios
 *
 * @param {Object} params Axios params contains
 *  - url: API endpoint
 *  - method: GET, POST, PUT, PATCH, DELETE
 *  - data: data payload
 *  - params: parameter of url endpoint
 * @returns {Axios} Axios request
 */
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