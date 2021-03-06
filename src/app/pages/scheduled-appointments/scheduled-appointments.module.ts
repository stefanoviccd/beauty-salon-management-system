import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ScheduledAppointmentsPageRoutingModule } from './scheduled-appointments-routing.module';

import { ScheduledAppointmentsPage } from './scheduled-appointments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduledAppointmentsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ScheduledAppointmentsPage]
})
export class ScheduledAppointmentsPageModule {}
