import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  url = 'http://localhost:7018/api/Treatment';

  constructor(private http: HttpClient) { }

  getAllTreatments(){
    return this.http.get(`${this.url}`).toPromise();
  }
}
