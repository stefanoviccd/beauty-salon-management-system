import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTreatmentsPage } from './all-treatments.page';

const routes: Routes = [
  {
    path: '',
    component: AllTreatmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTreatmentsPageRoutingModule {}
