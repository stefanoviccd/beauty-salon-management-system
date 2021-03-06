import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppointmentService } from 'src/app/services/appointmentService/appointment.service';

@Component({
  selector: 'app-treatment-modal',
  templateUrl: './treatment-modal.page.html',
  styleUrls: ['./treatment-modal.page.scss'],
})
export class TreatmentModalPage implements OnInit {
  @Input() appointment;
  @Input() scheduledAppointmentsPage;
  constructor(
    private modalController: ModalController,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss(
      {
        action:'close'
      }
    );
  }

  deleteAppointment() {
    this.modalController.dismiss(
      {
        action:'delete',
        appointment: this.appointment
      }
    );
  }

  scheduleAppointment() {
    this.modalController.dismiss(
      { action: 'schedule',
      appointment: this.appointment
      }
    );
  }

  rejectAppointment() {
    this.modalController.dismiss(
      { action: 'reject',
      appointment: this.appointment
      });
  }
}
