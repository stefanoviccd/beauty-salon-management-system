import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTreatmentPage } from '../add-treatment/add-treatment.page';

import { LoginPage } from '../login/login.page';
import { MyAppointmentsPage } from '../my-appointments/my-appointments.page';
import { NewAppointmentPage } from '../new-appointment/new-appointment.page';
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
        component: NewAppointmentPage,
      },
      {
        path: 'myAppointments',
        component: MyAppointmentsPage,
      },
      {
        path: 'treatments',
        component: TreatmentsPage,
        children: [
          {
            path: 'addTreatment',
          component: AddTreatmentPage
        }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
