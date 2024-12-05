export interface TelemetryReportDataModel {
  id: string;
  date: string;
  period: string;
  data: TelemetryReportGraphModel[];
}

export interface TelemetryReportGraphModel {
  name: string;
  powerCycle: number;
  highVoltage: number;
  lowVoltage: number;
  color: string;
  total?: number
}

export interface TelemetryGraphDatasetModel {
  label: string;
  backgroundColor: string;
  data: number[];
}
