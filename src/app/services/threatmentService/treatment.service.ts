import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Treatment } from 'src/app/model/Treatment';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  url = 'https://localhost:7018/api/Treatment';

  constructor(private http: HttpClient) {}

  getAllTreatments() {
    return this.http.get<Treatment[]>(`${this.url}`);
  }


  addTreatment(t: Treatment) {
    const body= JSON.parse(JSON.stringify(t));

    this.http.post(this.url, body).subscribe(
      data => {
      alert('Success Adding');
      location.reload();
    },
    error => {
      alert('Error Adding');
      console.log(error);
    });
  }


  deleteTreatment(t: Treatment) {
    this.http
      .delete(this.url + '/' + t.id)
      .subscribe(
        data => {
        alert('Success deleting');
        location.reload();
      },
      error => {
        alert('Error deleting');
        console.log(error);
      });
  }

  updateTreatment(t: Treatment) {
    const body= JSON.parse(JSON.stringify(t));

    this.http.put(this.url, body).subscribe(
      data => {
      alert('Success updating');
      location.reload();
    },
    error => {
      alert('Error updating');
      console.log(error);
    });
  }
 getByName(n: string){
    let targetTreatment;
    let  treatments;
    this.getAllTreatments().subscribe(  data => {
      treatments=data;
    },
    error => {
      console.log(error);
    });
    treatments.forEach(element => {
      if(element.name===n){
      targetTreatment= element;
      }
    });
    if(targetTreatment==null){
      console.log('Nije pronadjen tretman');
    }
    return targetTreatment;
  }


}
