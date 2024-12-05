export interface ReportModel {
  id: string;
  date: string;
  period?: string;
  data: any;
}

export function createEmptyReport(): ReportModel {
  return {
    id: '',
    date: '',
    period: undefined,
    data: null,
  };
}
