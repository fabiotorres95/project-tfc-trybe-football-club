export type ServiceMessage = { message: string };

type SuccessTypes = 'SUCCESSFUL';
type ErrorTypes = 'NOT_FOUND';

export type ServiceResponseSuccess<T> = {
  status: SuccessTypes,
  data: T
};

export type ServiceResponseError = {
  status: ErrorTypes,
  data: ServiceMessage
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;
