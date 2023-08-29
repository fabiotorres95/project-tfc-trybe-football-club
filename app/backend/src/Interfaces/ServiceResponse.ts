export type ServiceMessage = { message: string };

type SuccessTypes = 'SUCCESSFUL';
type ErrorTypes = 'BAD_REQUEST' | 'INVALID_DATA' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseSuccess<T> = {
  status: SuccessTypes,
  data: T
};

export type ServiceResponseError = {
  status: ErrorTypes,
  data: ServiceMessage
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
