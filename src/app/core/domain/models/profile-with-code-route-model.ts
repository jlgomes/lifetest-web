import { MenuModel } from "@core/domain/models/menu-model";
import { CodeRouteModel } from "@core/domain/models/code-route-model";

export interface ProfileWithCodeRouteModel {
  id: string;
  code: string;
  name: string;
  status: boolean;
  createdAt: string; // Assuming the date is represented as a string in ISO 8601 format
  menus: MenuModel[];
  routes: CodeRouteModel[];
}

export function createEmptyProfileWithCodeRoute(): ProfileWithCodeRouteModel {
  return {
    id: '',
    code: '',
    name: '',
    status: false,
    createdAt: '',
    menus: [],
    routes: [],
  };
}
