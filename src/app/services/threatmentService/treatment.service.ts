import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Treatment } from 'src/app/model/Treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  url = 'http://localhost:7018/api/Treatment';
  treatments;
  targetTreatment: Treatment;

  constructor(private http: HttpClient) { }

  getAllTreatments(){
   /* return this.http.get<Treatment>(`${this.url}`, {responseType: 'json', observe: 'response' });
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.get(`${this.url}`, httpOptions);*/
    const t1=new Treatment('Manikir', 'Usluga manikira', 1200);
    const t2=new Treatment('Pedikir', 'Usluga pedikira', 1000);
    this.treatments=[t1,t2];
    return this.treatments;


  }

  addTreatment(t: Treatment){
    this.treatments.push(t);


  }
  deleteTreatment(t: Treatment){
   console.log('Treatment deleted');
  }

  updateTreatment(t: Treatment){
    console.log('Treatment updated');
    console.log(t);

  }
  getByName(n: string){
    let targetTreatment;
    this.treatments.forEach(element => {
      if(element.name===n){
      targetTreatment= element;
      }
    });
    if(targetTreatment==null){
      console.log('Nije pronadjen tretman');
    }
    return targetTreatment;
  }

  setTargetTreatment(e: Treatment){
    this.targetTreatment=e;
  }
  getTargetTreatment(){
    return this.targetTreatment;
  }
}
