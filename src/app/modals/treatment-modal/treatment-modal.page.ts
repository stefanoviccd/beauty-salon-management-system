import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-treatment-modal',
  templateUrl: './treatment-modal.page.html',
  styleUrls: ['./treatment-modal.page.scss'],
})
export class TreatmentModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
}

}
