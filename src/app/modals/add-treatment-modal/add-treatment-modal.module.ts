import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTreatmentModalPageRoutingModule } from './add-treatment-modal-routing.module';

import { AddTreatmentModalPage } from './add-treatment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTreatmentModalPageRoutingModule
  ],
  declarations: [AddTreatmentModalPage]
})
export class AddTreatmentModalPageModule {}
