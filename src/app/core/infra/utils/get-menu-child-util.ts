import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";
import {MenuModel} from "@core/domain/models/menu-model";


export function getMenuChildUtil(path: string): Array<MenuModel> {
  const {profile} = new AuthLocalStorageService().getAllLocalStorage();
  const menus = [] as MenuModel[];
  if (profile !== null) {
    let routeParent = {} as MenuModel

    profile.menus.forEach((menu: MenuModel) => {
      if (menu.path === path) {
        routeParent = menu;
      }
    })

    profile.menus.forEach((menu: MenuModel) => {
      if (
        menu.type == 'SUB_MENU' &&
        menu.parent !== null &&
        menu.parent?.id === routeParent.id
      ) {
        menus.push(menu);
      }
    })
  }
  return menus;
}
