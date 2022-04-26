import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {
  public open: boolean;

  constructor() {
    this.open=false;
   }

  ngOnInit() {
  }
  openForm(){
    this.open=true;
    console.log('Form opened!');
  }
  isOpenForm(){
    return this.open;
  }
  closeForm(){
    this.open=false;
    console.log('Form closed!');
  }

}
