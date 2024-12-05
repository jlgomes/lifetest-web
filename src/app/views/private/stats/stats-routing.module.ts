import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailedViewComponent } from './pages/detailed-view/detailed-view.component';
import { StatsComponent } from './pages/stats.component';
import { statsRoutes } from '@helpers/constants/path-rest-constants';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
  },
  {
    path: statsRoutes.DETAILED_VIEW,
    component: DetailedViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
