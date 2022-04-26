import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDayOfPage } from '../add-day-of/add-day-of.page';
import { AllTreatmentsPage } from '../all-treatments/all-treatments.page';

import { LoginPage } from '../login/login.page';
import { MyAppointmentsPage } from '../my-appointments/my-appointments.page';
import { NewAppointmentPage } from '../new-appointment/new-appointment.page';
import { ScheduledAppointmentsPage } from '../scheduled-appointments/scheduled-appointments.page';
import { TreatmentsPage } from '../treatments/treatments.page';


import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'newAppointment',
        component: NewAppointmentPage,
      },
      {
        path: 'scheduledAppointments',
        component: ScheduledAppointmentsPage
      },
      {
        path: 'treatments',
        component: TreatmentsPage,
      },
      {
        path: 'myAppointments',
        component: MyAppointmentsPage,
      },
      {
        path: 'showTreatments',
        component: AllTreatmentsPage,
      },
      {
        path: 'dayOff',
        component: AddDayOfPage,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
