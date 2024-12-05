export interface menuNode {
  id: string;
  name: string;
  children?: menuNode[];
}

/** Flat node with expandable and level information */
export interface menuItemFlatNode {
  expandable: boolean;
  id: string;
  name: string;
  level: number;
}

export function createEmptyMenuNode(): menuNode {
  return {
    id: '',
    name: '',
    children: [],
  };
}

export function createEmptyMenuItemFlatNode(): menuItemFlatNode {
  return {
    expandable: false,
    id: '',
    name: '',
    level: 0,
  };
}
