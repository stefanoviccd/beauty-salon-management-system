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

  constructor(
    private modalController: ModalController,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getScheduledAppointments();
    this.getRequiredAppointments();
    setTimeout(() => { this.ngOnInit() }, 1000 * 60 )
  }

  async showModal(e) {
    const modal = await this.modalController.create({
      component: TreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      showBackdrop: true,
      componentProps: {
        appointment: e,
        scheduledAppointmentsPage: this
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.action==='close'){}
    else if(data.action==='schedule'){
      this.scheduleAppointment(data.appointment);
    }
    else if(data.action==='reject'){
      this.rejectAppointment(data.appointment);
    }
    else if(data.action==='delete'){
      this.deleteAppointment(data.appointment);
    }

  }

  getScheduledAppointments() {
    this.appointmentService.getScheduledAppointments().subscribe(
      (result) => {
        this.scheduledAppointments = result;
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
    return this.scheduledAppointments;
  }

  getRequiredAppointments() {
    this.appointmentService.getRequiredAppointments().subscribe(
      (result) => {
        this.requiredAppointments = result;
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
    return this.scheduledAppointments;
  }


  deleteAppointment(appointment: Appointment) {

    console.log('Trying to delete..');
    this.appointmentService.delete(appointment).subscribe(
      (data) => {

      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }
  scheduleAppointment(appointment: Appointment) {
    console.log('Trying to schedule..');
    this.appointmentService.schedule(appointment).subscribe(
      (data) => {
      //  this.closeModal();
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }

  rejectAppointment(appointment: Appointment) {
    console.log('Trying to reject..');
    this.appointmentService.reject(appointment).subscribe(
      (data) => {
       // this.closeModal();
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }
}
