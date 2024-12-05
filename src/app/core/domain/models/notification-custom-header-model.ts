import { NotificationSlotModel } from "@core/domain/models/notification-slot-model";

export interface NotificationCustomHeaderModel {
  totalRead: number;
  totalUnread: number;
  notifications: NotificationSlotModel[];
}

export function createEmptyNotificationCustomHeader(): NotificationCustomHeaderModel {
  return {
    totalRead: 0,
    totalUnread: 0,
    notifications: [],
  };
}
