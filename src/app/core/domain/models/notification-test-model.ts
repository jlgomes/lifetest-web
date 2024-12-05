import { TestModel, createEmptyTest } from "@core/domain/models/test-model";

export interface NotificationTestModel {
  id: string;
  readConfirmation: boolean;
  type: 'ERROR' | 'FINISHED';
  test: TestModel;
  createdAt: string;
}

export function createEmptyNotification(): NotificationTestModel {
  return {
    id: '',
    readConfirmation: false,
    type: 'ERROR',
    test: createEmptyTest(),
    createdAt: '',
  };
}
