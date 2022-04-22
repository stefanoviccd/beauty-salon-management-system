import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

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
  },
  {
    path: 'new-appointment',
    loadChildren: () => import('./pages/new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule)
  },
  {
    path: 'my-appointments',
    loadChildren: () => import('./pages/my-appointments/my-appointments.module').then( m => m.MyAppointmentsPageModule)
  },

  {
    path: 'scheduled-appointments',
    loadChildren: () => import('./pages/scheduled-appointments/scheduled-appointments.module').then( m => m.ScheduledAppointmentsPageModule)
  },
  {
    path: 'treatments',
    loadChildren: () => import('./pages/treatments/treatments.module').then( m => m.TreatmentsPageModule)
  },
  {
    path: 'all-treatments',
    loadChildren: () => import('./pages/all-treatments/all-treatments.module').then( m => m.AllTreatmentsPageModule)
  },
  {
    path: 'add-day-of',
    loadChildren: () => import('./pages/add-day-of/add-day-of.module').then( m => m.AddDayOfPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


