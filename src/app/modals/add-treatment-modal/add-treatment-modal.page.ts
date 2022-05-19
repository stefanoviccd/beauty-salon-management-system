import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import tr from 'date-fns/esm/locale/tr/index.js';
import { Treatment } from 'src/app/model/Treatment';
import { TreatmentsPage } from 'src/app/pages/treatments/treatments.page';
import { TreatmentService } from 'src/app/services/threatmentService/treatment.service';

@Component({
  selector: 'app-add-treatment-modal',
  templateUrl: './add-treatment-modal.page.html',
  styleUrls: ['./add-treatment-modal.page.scss'],
})
export class AddTreatmentModalPage implements OnInit {
  public title;
  public add=true;
  public change=false;
  public treatment: Treatment;
  public treatmentsPage: TreatmentsPage;

  constructor(private modalController: ModalController, private treatmentService: TreatmentService) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss(
      { action: 'close'
      }
    );
    this.treatmentsPage.ngOnInit();
}

addTreatment(){
  this.modalController.dismiss(
    { action: 'add',
    treatment: this.treatment
    }
  );

}

changeTreatmentInfo(){
  this.modalController.dismiss(
    { action: 'change',
    treatment: this.treatment
    }
  );
}

}
