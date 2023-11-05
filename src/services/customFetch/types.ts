/* eslint-disable @typescript-eslint/no-explicit-any */

export type CustomFetchFn = (url: CustomFetchUrl, init?: CustomRequestInit, fetchFn?: typeof fetch) => Promise<any>;

export type HttpMethods = 'get' | 'post' | 'patch' | 'put' | 'delete';

export type CustomFetchDef = Record<HttpMethods, CustomFetchFn>;

export type CustomFetchUrl =
  | {
      url: string;
      baseUrl?: string;
    }
  | string;

export type CustomRequestInit = Omit<RequestInit, 'body'> & {
  body?: Record<string, any> | BodyInit | null | unknown[];
};

export type ResponsePageT<T> = {
  content: Array<T>;
  totalElements?: number;
};

type ExceptionClassType =
  | 'ServerError'
  | 'NotFoundError'
  | 'ObjectNotFoundError'
  | 'BadRequestError'
  | 'AlreadyVotedError'
  | 'ObsceneLanguageError'
  | 'EmailTakenError'
  | 'ValidationError'
  | 'AlreadyLikedError'
  | 'AlreadyUnlikedError'
  | 'UserNotFoundError'
  | 'PasswordMatchError'
  | 'FileTooLargeError'
  | 'UnsupportedFileTypeError'
  | 'UnauthorizedError'
  | 'ForbiddenError'
  | 'JWTExpiredSignatureError'
  | 'JWTDecodeError';

export type ErrorType = {
  code: number;
  message: string;
  payload: string;
  exception_class: ExceptionClassType;
};
