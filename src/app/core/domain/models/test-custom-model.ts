import { ProductModel, createEmptyProduct } from "@core/domain/models/product-model";
import { UserSummaryModel, createEmptyUserSummary } from "@core/domain/models/user-summary-model";
import { LedTelemetryModel } from "./led-telemetry-model";
import { PingTelemetryModel } from "./ping-telemetry-model";

export interface TestCustomModel {
  id: string;
  Status?: string;
  createdAt: string;
  startDate: string;
  finishDate?: string | null;
  duration: number;
  lastLedError?: LedTelemetryModel | null,
  lastLedTelemetry?: LedTelemetryModel | null,
  lastPingError?: PingTelemetryModel | null,
  lastPingTelemetry?: PingTelemetryModel | null,
  product: ProductModel;
  user: UserSummaryModel;
  serialProduct: string;
  serialBox: string;
  serialPowerSource: string;
}

export function createEmptyTestCustomModel(): TestCustomModel {
  return {
    id: '',
    Status: '',
    createdAt: '',
    startDate: '',
    finishDate: null,
    duration: 0,
    lastLedError: null,
    lastLedTelemetry: null,
    lastPingError: null,
    lastPingTelemetry: null,
    product: createEmptyProduct(),
    user: createEmptyUserSummary(),
    serialProduct: '',
    serialBox: '',
    serialPowerSource: ''
  };
}
