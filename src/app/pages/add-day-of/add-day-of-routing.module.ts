import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDayOfPage } from './add-day-of.page';

const routes: Routes = [
  {
    path: '',
    component: AddDayOfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDayOfPageRoutingModule {}
