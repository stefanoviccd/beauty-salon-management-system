import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TreatmentService } from 'src/app/services/treatment.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {
  public open: boolean;
  public name: string;
  public description: string;
  public price: string;
  public allet: any;

  constructor(
    private alert: AlertController,
    private treatmentService: TreatmentService
  ) {
    this.open = false;
  }

  ngOnInit() {}
  openForm() {
    this.open = true;
    console.log('Form opened!');
  }
  isOpenForm() {
    return this.open;
  }
  async allertAll(header: string, message: string) {
    this.allet = await this.alert.create({ header, message, buttons: ['ok'] });
    await this.allet.present();
  }
  addTreatment() {
    const record = {
      name: this.name,
      description: this.description,
      price: this.price,
    };
    this.treatmentService.createNewTreatment(record).then(res=>{
      console.log(res);
      console.log('data saved');
    }
    ).catch(error=>{
      console.log(error);
    });

    this.open = false;
    console.log('Form closed!');
  }
}
