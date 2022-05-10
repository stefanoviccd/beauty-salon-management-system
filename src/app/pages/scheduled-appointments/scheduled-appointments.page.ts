import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TreatmentModalPage } from 'src/app/modals/treatment-modal/treatment-modal.page';


@Component({
  selector: 'app-scheduled-appointments',
  templateUrl: './scheduled-appointments.page.html',
  styleUrls: ['./scheduled-appointments.page.scss'],
})
export class ScheduledAppointmentsPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async showModal(id){
    const modal= await this.modalController.create({
      component: TreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      componentProps: {
        value: id
      }

    });
    await modal.present();
  }

}
