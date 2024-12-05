import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SidebarComponent } from '@shared/components/layout/sidebar/sidebar.component';
import { ToolbarComponent } from '@shared/components/layout/toolbar/toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StatsModule } from './stats/stats.module';
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { ClientsModule } from "./clients/clients.module";
import { RegistersModule } from './registers/registers.module';
import { ControlModule } from './control/control.module';
import { ProfilesModule } from "./profiles/profiles.module";
import { TestsModule } from "./tests/tests.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { RepairModule } from "./repair/repair.module";
import { LogEventModule } from "./event-log/log-event.module";
import { ReportsModule } from './reports/reports.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { TelemetryModule } from "./telemetry/telemetry.module";
import { MatIconModule } from '@angular/material/icon';
import { RackConfigurationModule } from './rack-configuration/rack-configuration.module';


@NgModule({
  declarations: [PrivateComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrivateRoutingModule,

    // Application modules
    DashboardModule,
    StatsModule,
    ProductsModule,
    UsersModule,
    ProductsModule,
    ClientsModule,
    RegistersModule,
    ControlModule,
    ProfilesModule,
    TestsModule,
    NotificationsModule,
    RepairModule,
    LogEventModule,
    ReportsModule,
    MaintenanceModule,
    TelemetryModule,
    RackConfigurationModule,

    // Components
    SidebarComponent,
    ToolbarComponent,

    // Libs
    MatIconModule,
  ],
  exports: [
    SidebarComponent,
    ToolbarComponent,
    SharedModule,
  ]
})
export class PrivateModule { }
