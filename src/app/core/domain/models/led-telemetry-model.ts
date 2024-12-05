import { TelemetryModel, createEmptyTelemetry } from './telemetry-model';

export interface LedTelemetryModel extends TelemetryModel {
  ledPower: boolean;
  led2G: boolean;
  led5G: boolean;
}

export function createEmptyLedTelemetryModel(): LedTelemetryModel {
  return {
    ...createEmptyTelemetry(),
    led2G: false,
    led5G: false,
    ledPower: false,
  };
}
