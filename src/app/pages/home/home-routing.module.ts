import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from '../login/login.page';
import { MyAppointmentsPage } from '../my-appointments/my-appointments.page';
import { NewAppointmentPage } from '../new-appointment/new-appointment.page';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'newAppointment',
        component: NewAppointmentPage
      },
      {
        path: 'myAppointments',
        component: MyAppointmentsPage
      }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
