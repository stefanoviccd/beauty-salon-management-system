import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTreatmentPage } from '../add-treatment/add-treatment.page';

import { TreatmentsPage } from './treatments.page';

const routes: Routes = [
  {
    path: '',
    component: TreatmentsPage,
    children:[
      { path: '/new',
      component: AddTreatmentPage}


    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentsPageRoutingModule {}
