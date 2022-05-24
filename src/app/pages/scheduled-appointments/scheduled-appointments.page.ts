import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  allet: any;
  pipe = new DatePipe('en-US');

  constructor(
    private modalController: ModalController,
    private alert: AlertController,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getScheduledAppointments();
    this.getRequiredAppointments();
    setTimeout(() => {
      this.ngOnInit();
    }, 1000 * 60);
  }

  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  async showModal(e) {
    const modal = await this.modalController.create({
      component: TreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      showBackdrop: true,
      componentProps: {
        appointment: e,
        scheduledAppointmentsPage: this,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data.action === 'close') {
    } else if (data.action === 'schedule') {
      this.scheduleAppointment(data.appointment);
    } else if (data.action === 'reject') {
      this.rejectAppointment(data.appointment);
    } else if (data.action === 'delete') {
      this.deleteAppointment(data.appointment);
    }
  }

  getScheduledAppointments() {
    this.appointmentService.getScheduledAppointments().subscribe(
      (result) => {
        this.scheduledAppointments = result;
      },
      (error) => {
        this.allertAll('Greška', 'Došlo je do greške.');
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
        this.allertAll('Greška', 'Došlo je do greške.');
      }
    );
    return this.scheduledAppointments;
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.delete(appointment).subscribe(
      (data) => {
        this.allertAll('', 'Termin uspešno otkazan.');
        this.ngOnInit();
      },
      (error) => {
        this.allertAll('Greška', 'Došlo je do greške. Molimo Vas, pokušajte ponovo.');
      }
    );
  }
  scheduleAppointment(appointment: Appointment) {
    this.appointmentService.schedule(appointment).subscribe(
      (data) => {
        this.allertAll('', 'Termin uspešno zakazan.');
        this.ngOnInit();
      },
      (error) => {
        this.allertAll('Greška', 'Došlo je do greške. Molimo Vas, pokušajte ponovo.');
      }
    );
  }

  rejectAppointment(appointment: Appointment) {
    console.log('Trying to reject..');
    this.appointmentService.reject(appointment).subscribe(
      (data) => {
        // this.closeModal();
        this.allertAll('', 'Termin uspešno odbijen.');
        this.ngOnInit();
      },
      (error) => {
        this.allertAll('Greška', 'Došlo je do greške. Molimo Vas, pokušajte ponovo.');
      }
    );
  }
}
