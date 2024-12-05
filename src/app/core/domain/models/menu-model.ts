export interface MenuModel {
  id: string;
  code: string;
  name: string;
  path: string;
  icon: string;
  sort: number;
  parent?: MenuModel;
  component: string;
  svg:boolean;
  type: 'MENU' | 'SUB_MENU'
}

export default function createEmptyMenu(): MenuModel {
  return {
    id: '',
    code: '',
    name: '',
    path: '',
    icon: '',
    sort: 0,
    parent: undefined,
    component: '',
    svg: false,
    type: 'MENU',
  };
}
