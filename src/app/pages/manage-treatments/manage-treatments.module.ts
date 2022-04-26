import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageTreatmentsPageRoutingModule } from './manage-treatments-routing.module';

import { ManageTreatmentsPage } from './manage-treatments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageTreatmentsPageRoutingModule
  ],
  declarations: [ManageTreatmentsPage]
})
export class ManageTreatmentsPageModule {}
