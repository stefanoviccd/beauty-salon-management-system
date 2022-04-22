import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDayOfPageRoutingModule } from './add-day-of-routing.module';

import { AddDayOfPage } from './add-day-of.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDayOfPageRoutingModule
  ],
  declarations: [AddDayOfPage]
})
export class AddDayOfPageModule {}
