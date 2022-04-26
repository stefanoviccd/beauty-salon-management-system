import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatmentsPage } from './treatments.page';

const routes: Routes = [
  {
    path: '',
    component: TreatmentsPage,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class TreatmentsPageRoutingModule {}
