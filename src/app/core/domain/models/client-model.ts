export interface ClientModel {
  id: string;
  name: string;
  ipRange: string;
}

export function createEmptyClient(): ClientModel {
  return {
    id: '',
    name: '',
    ipRange: '',
  };
}
