import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/infra/guards/auth.guard';
import { ShellService } from '@core/infra/shell/shell.service';
import { appRoutes } from '@helpers/constants/path-rest-constants';

const routes: Routes = [
  { path: '', redirectTo: appRoutes.LOGIN, pathMatch: 'full' },
  {
    path: appRoutes.LOGIN,
    loadChildren: () =>
      import('./views/public/login/login.module').then((m) => m.LoginModule),
    canActivate: [authGuard],
  },
  {
    path: appRoutes.FORGOT_PASSWORD,
    loadChildren: () =>
      import('./views/public/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
    canActivate: [authGuard],
  },
  {
    path: `${appRoutes.CHANGE_PASSWORD}/:id`,
    loadChildren: () =>
      import('./views/public/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
    canActivate: [authGuard],
  },
  {
    path: `${appRoutes.ACTIVATE_USER}/:id`,
    loadChildren: () =>
      import('./views/public/activate-user/activate-user.module').then(
        (m) => m.ActivateUserModule
      ),
    canActivate: [authGuard],
  },
  ShellService.childRoutes([
    {
      path: '',
      loadChildren: () =>
        import('./views/private/private.module').then((m) => m.PrivateModule),
    },
  ]),
  {
    path: '**',
    loadChildren: () =>
      import('./views/public/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
