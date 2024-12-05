import { TelemetryModel, createEmptyTelemetry } from './telemetry-model';

export interface PingTelemetryModel extends TelemetryModel {
  pingP1: boolean;
  pingP2: boolean;
  pingP3: boolean;
  pingP4: boolean;
}

export function getPingTelemetryValue(
  telemetry: PingTelemetryModel,
  key: string
): boolean | undefined {
  const keys = ['pingP1', 'pingP2', 'pingP3', 'pingP4'];
  if (keys.includes(key)) {
    return telemetry[key as keyof PingTelemetryModel] as boolean;
  }
  return undefined;
}

export type BooleanStringUndefinedOrNull = boolean | string | undefined | null;

export function createEmptyPingTelemetryModel(): PingTelemetryModel {
  return {
    ...createEmptyTelemetry(),
    pingP1: false,
    pingP2: false,
    pingP3: false,
    pingP4: false,
  };
}
