import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  IonRouterOutlet,
  ModalController,
} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddTreatmentModalPage } from 'src/app/modals/add-treatment-modal/add-treatment-modal.page';
import { TreatmentService } from 'src/app/services/threatmentService/treatment.service';
import { Treatment } from 'src/app/model/Treatment';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {
  public allet: any;
  public treatments: Treatment[] = [];
  public newTreatment: Treatment;
  private alet: any;

  constructor(
    private alert: AlertController,
    private treatmentService: TreatmentService,
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTreatments();
    this.newTreatment = new Treatment("","",0,0);
  }

  parseDate(date: Date){
    return "1";
  }

  async showModal() {
    const modal = await this.modalController.create({
      component: AddTreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      showBackdrop: true,
      componentProps: {
        title: 'Nova usluga',
        treatment: this.newTreatment,
        treatmentsPage: this
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if(data.action==='close'){}
    else if(data.action==='add'){
      this.addTreatment(data.treatment);
    }

  }

  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }

  getTreatments() {
    this.treatmentService.getAllTreatments().subscribe(
      (result) => {
        this.treatments = result;
      },
      (error) => {
        this.allertAll('Gre??ka', 'Do??lo je do gre??ke.');
      }
    );
  }

  deleteTreatment(t: Treatment) {
    this.treatmentService.deleteTreatment(t).subscribe(
    data => {
      this.ngOnInit();
    },
    error => {
      this.allertAll('Gre??ka', 'Do??lo je do gre??ke.');
    });
  }

  async openInfoModal(t: Treatment) {
    const modal = await this.modalController.create({
      component: AddTreatmentModalPage,
      canDismiss: true,
      cssClass: 'modal',
      showBackdrop: true,
      componentProps: {
        title: 'Informacije o usluzi',
        treatment: t,
        add: false,
        change: true,
        treatmentsPage: this
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data.action==='close'){}
    else if(data.action==='change'){
      this.changeTreatmentInfo(data.treatment);
    }
  }

  getUserRole(){
return this.authService.getUserRole();
  }

  scheduleSpecificTreatment(t: Treatment){
    this.router.navigate(['home/newAppointment']);
  }
  addTreatment(treatment: Treatment){
    if(treatment.name==='' || treatment.name===undefined || treatment.description==='' || treatment.description===undefined ||
     treatment.price=== undefined){
      this.allertAll('Gre??ka', 'Morate uneti sve podatke.');
      return;
    }
    this.treatmentService.addTreatment(treatment).subscribe(
      (result) => {
        this.allertAll('', 'Tretman uspe??no dodat.');
        this.ngOnInit();
      },
      (error) => {
        this.allertAll('Gre??ka', 'Do??lo je do gre??ke.');
      }
    );
  }

  changeTreatmentInfo(treatment: Treatment){
    if(treatment.name==='' || treatment.name===undefined || treatment.description==='' || treatment.description===undefined ||
    treatment.price=== undefined){
     this.allertAll('Gre??ka', 'Morate uneti sve podatke.');
     return;
   }
    this.treatmentService.updateTreatment(treatment).subscribe(
      (result) => {
        this.allertAll('', 'Tretman uspe??no promenjen.');
      },
      (error) => {
        this.allertAll('Gre??ka', 'Do??lo je do gre??ke.');
      }
    );
  }
}
