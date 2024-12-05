export interface ErrorModel {
  timestamp: number;
  status: number;
  title: string;
  detail: string;
  message: string;
  errors: ObjectError[];
}

interface ObjectError {
  name: string;
  message: string;
}

export function createEmptyError(): ErrorModel {
  return {
    timestamp: 0,
    status: 0,
    title: '',
    detail: '',
    message: '',
    errors: [],
  };
}
