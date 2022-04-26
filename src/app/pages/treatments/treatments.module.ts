import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentsPageRoutingModule } from './treatments-routing.module';

import { TreatmentsPage } from './treatments.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    TreatmentsPageRoutingModule
  ],
  declarations: [TreatmentsPage]
})
export class TreatmentsPageModule {}
