import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { TreatmentsPage } from './pages/treatments/treatments.page';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    component: HomePage,
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    //canLoad: [AuthGuard]
  },
  {
    path: 'new-appointment',
    loadChildren: () => import('./pages/new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'my-appointments',
    loadChildren: () => import('./pages/my-appointments/my-appointments.module').then( m => m.MyAppointmentsPageModule),
    canLoad: [AuthGuard]
  },

  {
    path: 'scheduled-appointments',
    loadChildren: ()=> import('./pages/scheduled-appointments/scheduled-appointments.module').then( m => m.ScheduledAppointmentsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'all-treatments',
    loadChildren: () => import('./pages/all-treatments/all-treatments.module').then( m => m.AllTreatmentsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'add-day-of',
    loadChildren: () => import('./pages/add-day-of/add-day-of.module').then( m => m.AddDayOfPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'treatments',
    component: TreatmentsPage,
    loadChildren: () => import('./pages/treatments/treatments.module').then( m => m.TreatmentsPageModule),
    canLoad: [AuthGuard]
  },

  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'treatment-modal',
    loadChildren: () => import('./modals/treatment-modal/treatment-modal.module').then( m => m.TreatmentModalPageModule)
  },
  {
    path: 'add-treatment-modal',
    loadChildren: () => import('./modals/add-treatment-modal/add-treatment-modal.module').then( m => m.AddTreatmentModalPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


