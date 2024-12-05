export interface CodeRouteModel {
  code: string;
}

export default function createEmptyCodeRoute(): CodeRouteModel {
  return {
    code: '',
  };
}
