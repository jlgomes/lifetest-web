import { MenuModel } from "@core/domain/models/menu-model";
import { RouteModel } from "@core/domain/models/route-model";

export interface ProfileModel {
  id: string;
  code: string;
  name: string;
  status: boolean;
  createdAt: string; // Assuming the date is represented as a string in ISO 8601 format
  routes: RouteModel[];
  menus: MenuModel[];
}

export function createEmptyProfile(): ProfileModel {
  return {
    id: '',
    code: '',
    name: '',
    status: false,
    createdAt: '',
    routes: [],
    menus: [],
  };
}
