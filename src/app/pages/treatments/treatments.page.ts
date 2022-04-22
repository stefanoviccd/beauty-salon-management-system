import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  showAddTreatment(){
    this.router.navigate(['home/treatments/addTreatment']);
   //this.router.navigate(['login']);

  }

}
