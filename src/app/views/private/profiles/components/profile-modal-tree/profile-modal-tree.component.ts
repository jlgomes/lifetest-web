import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { menuItemFlatNode, menuNode } from '@core/domain/models/menu-node-model';

@Component({
  selector: 'app-profile-modal-tree',
  templateUrl: './profile-modal-tree.component.html',
  styleUrls: ['./profile-modal-tree.component.scss']
})

export class ProfileModalTreeComponent implements OnInit {
  @Input() data: menuNode = { id: '', name: '' };
  @Input() activeMenus: Set<string> = new Set([]);
  @Input() activeRoutes: Set<string> = new Set([]);
  @Output() onAddMenu: EventEmitter<string> = new EventEmitter();
  @Output() onRemoveMenu: EventEmitter<string> = new EventEmitter();
  @Output() onAddRoute: EventEmitter<string> = new EventEmitter();
  @Output() onRemoveRoute: EventEmitter<string> = new EventEmitter();

  protected menuIds: Set<string> = new Set([]);
  protected routesIds: Set<string> = new Set([]);

  private _transformer = (node: menuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level: level,
    };
  };

  protected treeControl = new FlatTreeControl<menuItemFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  protected treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  protected dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  ngOnInit() {
    if (Array.from(this.activeMenus).length > 0 || Array.from(this.activeRoutes).length > 0) {
      this.menuIds = this.activeMenus;
      this.routesIds = this.activeRoutes;
    };
    this.dataSource.data = [this.data];
  }

  hasChild = (_: number, node: menuItemFlatNode) => node.expandable;

  handleChange(id: string, level: number, action: 'add' | 'remove') {
    if (action === 'add') {
      level === 2 ? this.onAddRoute.emit(id) : this.onAddMenu.emit(id);
    } else if (action == 'remove') {
      level === 2 ? this.onRemoveRoute.emit(id) : this.onRemoveMenu.emit(id);
    }
  }

  public onChangeMenu(data: { checked: boolean }, item: menuItemFlatNode) {
    if (data.checked) {
      this.onCheck(item);
    } else {
      this.onUncheck(item);
    }
  }

  allChildrenChecked(node: menuItemFlatNode) {
    return this.treeControl.getDescendants(node).every(submenu => (this.menuIds.has(submenu.id) || this.routesIds.has(submenu.id)));
  }

  hasSomeChildChecked(node: menuItemFlatNode) {
    return this.treeControl.getDescendants(node).some(submenu => (this.menuIds.has(submenu.id) || this.routesIds.has(submenu.id)));
  }

  hasNoChildChecked(node: menuItemFlatNode) {
    return this.treeControl.getDescendants(node).every(submenu => (!this.menuIds.has(submenu.id) && !this.routesIds.has(submenu.id)));
  }

  getParentNode(node: menuItemFlatNode): menuItemFlatNode | null {
    const nodeLevel = this.treeControl.getLevel(node);
    let level = nodeLevel;

    if (nodeLevel === 0) return null;

    //indice do nó na árvore
    const index = this.treeControl.dataNodes.indexOf(node);

    for (let i = index; i >= 0; i--) {
      let item = this.treeControl.dataNodes[i];

      level = item.level;
      if (level === nodeLevel - 1) return item as menuItemFlatNode;
    }
    return null;
  }

  addItem(item: menuItemFlatNode) {
    item.level === 2 ? this.routesIds.add(item.id) : this.menuIds.add(item.id);
    this.handleChange(item.id, item.level, 'add');
  }

  removeItem(item: menuItemFlatNode) {
    item.level === 2 ? this.routesIds.delete(item.id) : this.menuIds.delete(item.id);
    this.handleChange(item.id, item.level, 'remove');
  }

  onCheck(item: menuItemFlatNode) {
    const parent = this.getParentNode(item);
    this.addItem(item);

    if (parent) {
      this.addItem(parent);

      const grandParent = this.getParentNode(parent);
      if (grandParent) {
        this.addItem(grandParent);
      }
    }

    if (this.treeControl.getDescendants(item).length > 0) {
      this.treeControl.getDescendants(item).forEach(subitem => {
        this.addItem(subitem);
      });
    }
  }

  onUncheck(item: menuItemFlatNode){
    const parent = this.getParentNode(item);
    this.removeItem(item);

    if (this.treeControl.getDescendants(item).length > 0) {
      this.treeControl.getDescendants(item).forEach(subitem => {
        this.removeItem(subitem);
      })
    }

    if (parent && this.hasNoChildChecked(parent)) {
      this.removeItem(parent);

      const grandParent = this.getParentNode(parent);
      if (grandParent && this.hasNoChildChecked(grandParent)) {
        this.removeItem(grandParent);
      }
    }
  }
}
