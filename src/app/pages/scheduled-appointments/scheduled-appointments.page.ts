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
  public appointments;
  pipe = new DatePipe('en-US');

  constructor(private modalController: ModalController, private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointments=this.appointmentService.getAppointments();
    this.appointments.forEach(e => {
      e.date=this.pipe.transform(e.date,'dd/MM/yyyy');
    });
    console.log(this.appointments);
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
   const  scheduledAppointments=[];
   this.appointments.forEach(e => {
     if(e.status==='zakazan'){
      scheduledAppointments.push(e);
     }

   });
        return scheduledAppointments;
  }
  getNewAppointments(){
    const  newAppointments=[];
    this.appointments.forEach(el => {
      if(el.status==='zahtevan'){
        newAppointments.push(el);
      }

    });
    return newAppointments;
   }
   deleteAppointment(e){
     console.log('Trying to delete..');
     this.appointmentService.delete(e);
   }
}
