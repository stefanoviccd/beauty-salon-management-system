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
  constructor(private modalController: ModalController, private appointmentService: AppointmentService) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
}

deleteAppointment(){
  console.log('Trying to delete..');
  this.appointmentService.delete(this.appointment);
  this.closeModal();
}

scheduleAppointment(){
  console.log('Trying to schedule..');
  this.appointmentService.schedule(this.appointment);
  this.closeModal();
}

rejectAppointment(){
  console.log('Trying to reject..');
  this.appointmentService.reject(this.appointment);
  this.closeModal();
}

}
