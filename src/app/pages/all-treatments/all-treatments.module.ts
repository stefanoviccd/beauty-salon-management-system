import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTreatmentsPageRoutingModule } from './all-treatments-routing.module';

import { AllTreatmentsPage } from './all-treatments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTreatmentsPageRoutingModule
  ],
  declarations: [AllTreatmentsPage]
})
export class AllTreatmentsPageModule {}
