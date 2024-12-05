import { TestCustomModel } from '@core/domain/models/test-custom-model';
import { RackModel, createEmptyRack } from './rack-model';

export interface SlotModel {
  id: string;
  name: string;
  status: boolean;
  camUrl: string;
  rack: RackModel;
  test?: TestCustomModel;
  inMaintenance: boolean;
  createdAt: string;
}

export function createEmptySlot(): SlotModel {
  return {
    id: '',
    name: '',
    status: false,
    camUrl: '',
    rack: createEmptyRack(),
    inMaintenance: false,
    createdAt: '',
  };
}
