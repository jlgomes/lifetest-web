export interface RouteSummaryModel {
  id: string;
  url: string;
  httpMethod: string;
  code: string;
  description: string;
}

export function createEmptyRouteSummary(): RouteSummaryModel {
  return {
    id: '',
    url: '',
    httpMethod: '',
    code: '',
    description: '',
  };
}
