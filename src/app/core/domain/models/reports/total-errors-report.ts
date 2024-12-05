export interface TotalErrorsReportDataModel {
  id: string;
  date: string;
  period: string;
  data: TotalErrorsReportGraphModel[];
}

export interface TotalErrorsReportGraphModel {
  name: string;
  rack: number;
  powerCycle: number;
  highVoltage: number;
  lowVoltage: number;
  color: string;
  total?: number
}

export interface TotalErrorsGraphDatasetModel {
  label: string;
  backgroundColor: string;
  data: number[];
}
