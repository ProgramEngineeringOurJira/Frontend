import { ErrorType } from './types';

export class HttpError extends Error {
  status: number;

  constructor(status: number, error: ErrorType) {
    super(error.exception_class);
    this.status = status;
    this.name = error.exception_class;
  }
}