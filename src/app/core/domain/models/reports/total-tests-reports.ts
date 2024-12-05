export interface TotalTestsReportDataModel {
  id: string;
  date: string;
  period: string;
  data: TotalTestsReportGraphModel[];
}

export interface TotalTestsReportGraphModel {
  name: string;
  powerCycle: number;
  highVoltage: number;
  lowVoltage: number;
  color: string;
}

export interface TotalTestsGraphDatasetModel {
  label: string;
  backgroundColor: string;
  data: number[];
}
