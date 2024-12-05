import { statusRepairType } from "@shared/types/status-repair-type";

export interface RepairForm {
  testID: string,
  arquivo8D: string | null,
  status: statusRepairType
}
