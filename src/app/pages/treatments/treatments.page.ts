import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { threadId } from 'worker_threads';
import { AddTreatmentModalPage } from 'src/app/modals/add-treatment-modal/add-treatment-modal.page';
import { TreatmentService } from 'src/app/services/threatmentService/treatment.service';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {
  public allet: any;
  public treatments;

  constructor(
    private alert: AlertController,
    private treatmentService: TreatmentService,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.getTreatments();
  }
  async showModal(ttl) {
    const modal = await this.modalController.create({
      component: AddTreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      componentProps: {
        title: ttl
      }

    });
    await modal.present();
  }
  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  getTreatments() {
 this.treatments = this.treatmentService.getAllTreatments();
    console.log('TREATMENTS');
    console.log(this.treatments);
  }
}
