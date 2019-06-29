import querystring, { ParsedUrlQueryInput } from "querystring";

export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

export async function getJSON(url: string, params: ParsedUrlQueryInput = {}) {
  const fullUrl = isEmptyObject(params)
    ? url
    : url + "?" + querystring.stringify(params);

  return fetch(fullUrl).then(response => response.json());
}
