import { isEmpty } from "lodash-es";

/**
 * Handles build url combine with params
 * e.g. abc.com/:id/:slug => abc.com/8/test
 * (8 & test is params of :id & :slug)
 *
 * @param {String} url The url
 * @param {Object} params The parameters
 * @returns {String} Url combined with params
 */
export const buildUrl = (url, params) => {
  if (isEmpty(params)) return url;

  const regex = new RegExp(`${Object.keys(params).map(k => `:${k}`).join('|')}`, 'g');

  return url.replace(regex, m => params[m.replace(':', '')]);
}