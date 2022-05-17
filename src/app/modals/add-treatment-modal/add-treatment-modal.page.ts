import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    this.modalController.dismiss();
    this.treatmentsPage.ngOnInit();
}

addTreatment(){
  this.treatmentService.addTreatment(this.treatment).subscribe(
    (result) => {
      this.closeModal();
    },
    (error) => {
      console.log('Error occured', error);
    }
  );
}

changeTreatmentInfo(){
  this.treatmentService.updateTreatment(this.treatment).subscribe(
    (result) => {
      this.closeModal();
    },
    (error) => {
      console.log('Error occured', error);
    }
  );
}

}
