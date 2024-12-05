import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLocalStorageService } from "@core/domain/services/auth-local-storage.service";
import isTokenValid from "@core/infra/utils/valid-token";
import { appRoutes } from '@helpers/constants/path-rest-constants';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  /**
   * Checks user authorization for routes
   * * canActivate
   */
  constructor(
    private _router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const _authLocalStoregeService: AuthLocalStorageService = new AuthLocalStorageService();
    const { token } = _authLocalStoregeService.getAllLocalStorage();

    if (token && isTokenValid(token)) {
      return true;
    } else {
      // If the token exists and is not valid, the user
      // is prompted a dialog to make a new login.
      // The logic is inside handle-errors.service.ts
      if (token) {
        return true;
      }
      else {
        this._router.navigate([appRoutes.LOGIN]);
        return false;
      }
    }
  }

}
