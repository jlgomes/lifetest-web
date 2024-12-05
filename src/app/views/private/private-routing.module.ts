import { ProductsComponent } from './products/pages/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/pages/dashboard.component';
import { ClientsComponent } from './clients/pages/clients.component';
import { ProfilesComponent } from './profiles/pages/profiles.component';
import { UsersComponent } from './users/pages/users.component';
import { TestsComponent } from './tests/pages/tests.component';
import { ControlComponent } from './control/pages/control.component';
import { NotificationsComponent } from "./notifications/pages/notifications.component";
import { LogEventComponent } from "./event-log/pages/log-event.component";
import { AccessManagerGuard } from '@core/infra/guards/access-manager.guard';
import { RackConfigurationComponent } from './rack-configuration/pages/rack-configuration.component';
import { appRoutes } from '@helpers/constants/path-rest-constants';
import { MaintenanceRegistersComponent } from './maintenance/pages/maintenance-registers/maintenance-registers.component';


const routes: Routes =
  [
    {
      path: appRoutes.CONTROL_PANEL,
      component: DashboardComponent,
    },
    {
      path: appRoutes.DASHBOARD,
      loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule),
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.REGISTERS,
      loadChildren: () => import('./registers/registers.module').then(m => m.RegistersModule),
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.REPORTS,
      loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.USERS,
      component: UsersComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.CLIENTS,
      component: ClientsComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.PROFILES,
      component: ProfilesComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.CUSTOMERS,
      component: ClientsComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.PRODUCTS,
      component: ProductsComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.TESTS,
      component: TestsComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.CONTROL,
      component: ControlComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.NOTIFICATIONS,
      component: NotificationsComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.REPAIR,
      loadChildren: () => import('./repair/repair.module').then(m => m.RepairModule),
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.EVENT,
      component: LogEventComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.MAINTENANCE,
      component: MaintenanceRegistersComponent,
      canActivate: [AccessManagerGuard]
    },
    {
      path: appRoutes.RACK_CONFIGURATION,
      component: RackConfigurationComponent,
      canActivate: [AccessManagerGuard]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PrivateRoutingModule { }
