import { VoltageModel, createEmptyVoltage } from "./voltage-model";

export interface RackModel {
  id: string;
  name: string;
  powerCyclePerDay: number;
  voltageChangePerDay: number;
  temperature: number;
  voltage: VoltageModel;
}

export function createEmptyRack(): RackModel {
  return {
    id: '',
    name: '',
    powerCyclePerDay: 0,
    voltageChangePerDay: 0,
    temperature: 0,
    voltage: createEmptyVoltage(),
  };
}
