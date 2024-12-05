import { ClientModel, createEmptyClient } from "@core/domain/models/client-model";

export interface ProductModel {
  id: string;
  model: string;
  type: 'VERTICAL' | 'HORIZONTAL';
  color: string;
  mediaId: string | null;
  hasLed2G: boolean;
  hasLed5G: boolean;
  hasLedPower: boolean;
  numberPorts: number;
  client: ClientModel;
  delimitationAreaLeds: any[];
}

export function createEmptyProduct(): ProductModel {
  return {
    id: '',
    model: '',
    type: 'VERTICAL',
    color: '',
    mediaId: '',
    hasLed2G: false,
    hasLed5G: false,
    hasLedPower: false,
    numberPorts: 0,
    client: createEmptyClient(),
    delimitationAreaLeds: [],
  };
}
