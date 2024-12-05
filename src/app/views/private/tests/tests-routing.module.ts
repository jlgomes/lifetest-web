import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingComponent } from './pages/reading/reading.component';
import { TestRegistrationComponent } from './pages/registration/test-registration.component';
import { FinishComponent } from './pages/finish/finish.component';
import { testsRoutes } from '@helpers/constants/path-rest-constants';

const routes: Routes = [
  {
    path: testsRoutes.TEST_REGISTRATION,
    component: TestRegistrationComponent,
  },
  {
    path: testsRoutes.TEST_READING,
    component: ReadingComponent,
  },
  {
    path: `${testsRoutes.TEST_FINISH}/:id`,
    component: FinishComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestsRoutingModule {}
