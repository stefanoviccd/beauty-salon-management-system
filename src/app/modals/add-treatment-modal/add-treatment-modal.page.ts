import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-treatment-modal',
  templateUrl: './add-treatment-modal.page.html',
  styleUrls: ['./add-treatment-modal.page.scss'],
})
export class AddTreatmentModalPage implements OnInit {
  public title;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
}

}
