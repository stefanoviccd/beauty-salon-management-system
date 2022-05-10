import { Component, OnInit } from '@angular/core';
import { TreatmentService } from 'src/app/services/threatmentService/treatment.service';

@Component({
  selector: 'app-all-treatments',
  templateUrl: './all-treatments.page.html',
  styleUrls: ['./all-treatments.page.scss'],
})
export class AllTreatmentsPage implements OnInit {

  public treatments;
  constructor(private treatmentService: TreatmentService) { }

  ngOnInit() {

  }


}
