import { SlotModel, createEmptySlot } from './slot-model';

export enum MaintenanceTypes {
  MECHANICAL = 'maintenance.types.mechanical',
  ELECTRICAL = 'maintenance.types.electrical',
  CABLES = 'maintenance.types.cables',
  CAMERAS = 'maintenance.types.cameras',
  HEATERS = 'maintenance.types.heaters',
}

export enum MaintenanceStatus {
  OPEN = 'maintenance.status.open',
  CLOSED = 'maintenance.status.closed',
  EXPIRED = 'maintenance.status.expired',
}

export interface MaintenanceModel {
  id: string;
  slot: SlotModel;
  status?: MaintenanceStatus;
  observation?: string;
  maintenanceType?: MaintenanceTypes | null;
  createdAt: string;
  deadlineDate: string;
  completionDate?: string | null;
}

export function createEmptyMaintenance(): MaintenanceModel {
  return {
    id: '',
    status: MaintenanceStatus.OPEN,
    maintenanceType: MaintenanceTypes.MECHANICAL,
    completionDate: '',
    deadlineDate: '',
    createdAt: '',
    slot: createEmptySlot(),
  };
}
