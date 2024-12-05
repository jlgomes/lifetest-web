import { MenuModel } from "@core/domain/models/menu-model";

export interface ProfileWithoutRouteModel {
  id: string;
  code: string;
  name: string;
  status: boolean;
  createdAt: string; // Assuming the date is represented as a string in ISO 8601 format
  menus: MenuModel[];
}

export function createEmptyProfileWithoutRoute(): ProfileWithoutRouteModel {
  return {
    id: '',
    code: '',
    name: '',
    status: false,
    createdAt: '',
    menus: [],
  };
}
