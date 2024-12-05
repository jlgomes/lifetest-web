import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceRegistersComponent } from './pages/maintenance-registers/maintenance-registers.component';
import { maintenanceRoutes } from '@helpers/constants/path-rest-constants';

const routes: Routes = [
  {
    path: maintenanceRoutes.REGISTERS,
    component: MaintenanceRegistersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
