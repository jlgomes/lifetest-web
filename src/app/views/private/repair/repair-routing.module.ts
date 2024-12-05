import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepairRegisterComponent } from './pages/register/repair-register/repair-register.component';
import { RepairComponent } from './pages/repair.component';
import { repairRoutes } from '@helpers/constants/path-rest-constants';

const routes: Routes = [
  {
    path: '',
    component: RepairComponent,
  },
  {
    path: repairRoutes.REGISTRATION,
    component: RepairRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepairRoutingModule { }
