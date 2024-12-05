import { RouteSummaryModel } from "@core/domain/models/route-summary-model";

export interface MenuSummaryModel {
  id: string
  code: string
  name: string
  path: string
  icon: string
  sort: number
  component: string
  svg: boolean
  type: 'MENU' | 'SUB_MENU'
  routers: RouteSummaryModel[]
}

export function createEmptyMenuSummary(): MenuSummaryModel {
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
    routers: [],
  };
}
