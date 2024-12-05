export interface RecurringErrorsReportDataModel {
  id: string;
  date: string;
  period: string;
  data: RecurringErrorsReportGraphModel[];
}

export interface RecurringErrorsReportGraphModel {
  name: string;
  color: string;
  leds: number;
  ping: number;
  total: number;
}

export interface RecurringErrorsGraphDatasetModel {
  label: string;
  backgroundColor: string;
  data: number[];
}
