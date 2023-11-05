export type ResponseType<T> = {
    code: number;
    message: string;
    payload: T;
    exception_class: 'string';
  };