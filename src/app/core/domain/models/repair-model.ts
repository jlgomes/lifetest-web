import { TestModel, createEmptyTest } from "@core/domain/models/test-model";


type RepairStatus = "PENDING" | "FALSE_REJECT" | "REAL_DEFECT"

export interface RepairModel {
  id: string;
  test: TestModel;
  mediaID?: string;
  status: RepairStatus;
  createdAt: string;
}

export function createEmptyRepair(): RepairModel {
  return {
    id: '',
    test: createEmptyTest(),
    mediaID: '',
    status: 'PENDING',
    createdAt: '',
  };
}
