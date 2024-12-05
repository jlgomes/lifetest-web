import { MenuModel } from "@core/domain/models/menu-model";

export interface RouteModel {
  id: string;
  url: string;
  httpMethod: string;
  code: string;
  description: string;
  menus: MenuModel[];
}

export function createEmptyRoute(): RouteModel {
  return {
    id: '',
    url: '',
    httpMethod: '',
    code: '',
    description: '',
    menus: [],
  };
}
