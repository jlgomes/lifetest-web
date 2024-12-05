import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthLocalStorageService } from '@core/domain/services/auth-local-storage.service';
import { ToastService } from '@core/domain/services/toast.service';
import { TypeToastEnum } from "@core/domain/enums/type-toast-enum";
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { appRoutes } from '@helpers/constants/path-rest-constants';

@Injectable({
  providedIn: 'root',
})
export class AccessManagerGuard {

  constructor(
    private _router: Router,
    private _authLocalStoregeService: AuthLocalStorageService,
    private readonly _toastService: ToastService,
    private _translate: TranslateService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    const { profile } = this._authLocalStoregeService.getAllLocalStorage();
    const menus = profile?.menus ?? [];

    if(menus.some(menu => menu.name === route.routeConfig?.path)){
      return true;
    } else {
      const toastsMessage = this._translate.instant("common.access-denied");
      this._toastService.show(toastsMessage, TypeToastEnum.ERROR);
      this._router.navigate([appRoutes.CONTROL_PANEL]);
      return false;
    };
  }
}
