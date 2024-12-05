import { MenuSummaryModel } from "@core/domain/models/menu-summary-model";
import { RouteSummaryModel } from "@core/domain/models/route-summary-model";

export interface MenuCustomModel {
  id: string
  code: string
  name: string
  path: string
  icon: string
  sort: number
  component: string
  svg: boolean
  type: 'MENU' | 'SUB_MENU'
  children: MenuSummaryModel[]
  routers: RouteSummaryModel[]
}

export function createEmptyMenuCustom(): MenuCustomModel {
  return {
    id: '',
    code: '',
    name: '',
    path: '',
    icon: '',
    sort: 0,
    component: '',
    svg: false,
    type: 'MENU',
    children: [],
    routers: [],
  };
}
