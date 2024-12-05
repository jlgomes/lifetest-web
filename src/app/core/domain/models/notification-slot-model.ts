import { SlotModel, createEmptySlot } from "@core/domain/models/slot-model";

export interface NotificationSlotModel {
  id: string;
  readConfirmation: boolean;
  type: 'ERROR' | 'FINISHED';
  slot: SlotModel;
  createdAt: string;
}

export function createEmptyNotificationCustom(): NotificationSlotModel {
  return {
    id: '',
    readConfirmation: false,
    type: 'ERROR',
    slot: createEmptySlot(),
    createdAt: '',
  };
}
