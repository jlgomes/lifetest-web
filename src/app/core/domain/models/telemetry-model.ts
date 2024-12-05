import { TestModel, createEmptyTest } from '@core/domain/models/test-model';

export interface TelemetryModel {
  id: string;
  status: boolean;
  test: TestModel;
  createdAt: string;
}

export function createEmptyTelemetry(): TelemetryModel {
  return {
    id: '',
    status: false,
    test: createEmptyTest(),
    createdAt: '',
  };
}
