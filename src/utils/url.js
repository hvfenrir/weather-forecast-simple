import { isEmpty } from "lodash-es";

export const buildUrl = (url, params) => {
  if (isEmpty(params)) return url;

  const regex = new RegExp(`${Object.keys(params).map(k => `:${k}`).join('|')}`, 'g');

  return url.replace(regex, m => params[m.replace(':', '')]);
}