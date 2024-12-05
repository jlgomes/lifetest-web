export interface VoltageModel {
  id: string;
  voltage: number;
}


export function createEmptyVoltage(): VoltageModel {
  return {
    id: '',
    voltage: 0,
  };
}
