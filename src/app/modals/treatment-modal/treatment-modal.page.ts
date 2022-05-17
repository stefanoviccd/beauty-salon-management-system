import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentService } from 'src/app/services/appointmentService/appointment.service';

@Component({
  selector: 'app-treatment-modal',
  templateUrl: './treatment-modal.page.html',
  styleUrls: ['./treatment-modal.page.scss'],
})
export class TreatmentModalPage implements OnInit {
  public appointment;
  public scheduledAppointmentsPage;
  constructor(
    private modalController: ModalController,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss();
    this.scheduledAppointmentsPage.ngOnInit();
  }

  deleteAppointment() {
    console.log('Trying to delete..');
    this.appointmentService.delete(this.appointment).subscribe(
      (data) => {
        this.closeModal();
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }

  scheduleAppointment() {
    console.log('Trying to schedule..');
    this.appointmentService.schedule(this.appointment).subscribe(
      (data) => {
        this.closeModal();
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }

  rejectAppointment() {
    console.log('Trying to reject..');
    this.appointmentService.reject(this.appointment).subscribe(
      (data) => {
        this.closeModal();
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }
}
