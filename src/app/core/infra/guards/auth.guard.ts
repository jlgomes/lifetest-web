import {ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {inject} from '@angular/core';
import {AuthLocalStorageService} from "@core/domain/services/auth-local-storage.service";
import { AuthService } from '@core/domain/services/auth.service';
import { appRoutes } from '@helpers/constants/path-rest-constants';


/**
 * Check user authorization system
 * canActivateFn
 *
 * */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const _router: Router = inject(Router);
  const _authLocalStoregeService: AuthLocalStorageService = inject(AuthLocalStorageService);
  const _authService: AuthService = inject(AuthService);

  const {token} = _authLocalStoregeService.getAllLocalStorage();

  if (_authService.isLoggedIn()) {
    _router.navigate([appRoutes.CONTROL_PANEL]);
    return false;
  } else {
 return true;
  }
};
