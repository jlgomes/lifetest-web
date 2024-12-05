export interface LogEventModel {
  id: string;
  name: string;
  date: string;
  message: string;
  module: string;
  savedData: string;
  lastedData: string;
  updatedBy: string;
}

export function createEmptyLogEvent(): LogEventModel {
  return {
    id: '',
    name: '',
    date: '',
    message: '',
    module: '',
    savedData: '',
    lastedData: '',
    updatedBy: '',
  };
}
