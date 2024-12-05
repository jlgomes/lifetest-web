import { Route, Routes } from '@angular/router';
import { RolesConstants } from '@helpers/constants/roles/roles-contants';
import { PrivateComponent } from '../../../views/private/private.component';
import { LoginGuard } from '@core/infra/guards/login.guard';

export class ShellService {
  /**
   * Config routes all system
   *
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      canActivate: [LoginGuard],
      component: PrivateComponent,
      children: routes,
      data: {
        reuse: true,
        roles: [RolesConstants.administrator, RolesConstants.manager],
      },
    };
  }
}
