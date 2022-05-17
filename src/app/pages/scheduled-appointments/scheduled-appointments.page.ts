import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TreatmentModalPage } from 'src/app/modals/treatment-modal/treatment-modal.page';
import { AppointmentService } from 'src/app/services/appointmentService/appointment.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Appointment } from 'src/app/model/Appointment';


@Component({
  selector: 'app-scheduled-appointments',
  templateUrl: './scheduled-appointments.page.html',
  styleUrls: ['./scheduled-appointments.page.scss'],
})
export class ScheduledAppointmentsPage implements OnInit {
  public scheduledAppointments;
  public requiredAppointments;
  pipe = new DatePipe('en-US');

  constructor(private modalController: ModalController, private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getScheduledAppointments();
    this.getRequiredAppointments();

  }
  async showModal(e){
    const modal= await this.modalController.create({
      component: TreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      showBackdrop:true,
      componentProps: {
        appointment: e
      }

    });
    await modal.present();
  }
  getScheduledAppointments(){
  
    this.appointmentService.getScheduledAppointments().subscribe(
      (result) => {
        this.scheduledAppointments = result;
        console.log(this.scheduledAppointments);
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
    return this.scheduledAppointments;
  }

  getRequiredAppointments(){
    this.appointmentService.getRequiredAppointments().subscribe(
      (result) => {
        this.requiredAppointments = result;
        console.log(this.requiredAppointments);
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
    return this.scheduledAppointments;
   }


   deleteAppointment(e){
     console.log('Trying to delete..');
     this.appointmentService.delete(e);
   }
   
}
