import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistersComponent } from './pages/registers.component';
import { TelemetryComponent } from '../telemetry/pages/telemetry.component';
import { registerRoutes } from '@helpers/constants/path-rest-constants';

const routes: Routes = [
  {
    path: '',
    component: RegistersComponent,
  },
  {
    path: registerRoutes.TELEMETRIES,
    component: TelemetryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistersRoutingModule {}
