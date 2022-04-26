import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageTreatmentsPage } from './manage-treatments.page';

const routes: Routes = [
  {
    path: '',
    component: ManageTreatmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageTreatmentsPageRoutingModule {}
