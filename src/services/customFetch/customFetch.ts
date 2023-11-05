import { ErrorType } from './types';
import { LC_ACCESS_TOKEN } from '../../utils/constants';

import { baseUrl, fetchWithRefreshToken } from './fetchWithRefreshToken';
import { CustomFetchDef, CustomFetchUrl, CustomRequestInit } from './types';

const resolveResponseBody = (response: Response) => {
  const param = response.headers
    .get('Content-Type')
    ?.toLowerCase()
    .split(';')[0];

  switch (param) {
    case 'application/json':
      return response.json();
    case 'text/html':
      return response.text();
    case 'blob':
      return response.blob();
    default:
      return response;
  }
};

const resolveUrlString = (url: CustomFetchUrl): string => {
  let urlString;
  if (typeof url === 'string') {
    urlString = `${baseUrl}/${url}`;
  } else {
    urlString = `${url.baseUrl}/${url.url}`;
  }
  return urlString;
};

const resolveFetchInit = (init?: CustomRequestInit) => {
  const authToken = localStorage.getItem(LC_ACCESS_TOKEN);
  const authorization =
    authToken && authToken.length > 0
      ? {
          Authorization: `Bearer ${authToken}`,
        }
      : null;
  const headers = {
    headers: {
      ...authorization,
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
    },
    ...init,
  };

  return {
    ...headers,
  } as RequestInit;
};

export const fetchBase = async (
  url: CustomFetchUrl,
  init?: CustomRequestInit,
  fetchFn = fetchWithRefreshToken,
) => {
  const response = await fetchFn(resolveUrlString(url), resolveFetchInit(init));
  if (response.ok) {
    return resolveResponseBody(response);
  }

  const error: ErrorType = await response.json();

  return Promise.reject(error);
};

export const makeFetch: CustomFetchDef = Object.freeze({
  post: (url, init?, fetchFn?) =>
    fetchBase(url, { ...init, method: 'POST' }, fetchFn),
  get: (url, init?, fetchFn?) =>
    fetchBase(url, { ...init, method: 'GET' }, fetchFn),
  patch: (url, init?, fetchFn?) =>
    fetchBase(url, { ...init, method: 'PATCH' }, fetchFn),
  put: (url, init?, fetchFn?) =>
    fetchBase(url, { ...init, method: 'PUT' }, fetchFn),
  delete: (url, init?, fetchFn?) =>
    fetchBase(url, { ...init, method: 'DELETE' }, fetchFn),
});