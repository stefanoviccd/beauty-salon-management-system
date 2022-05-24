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
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders();
    hdr.append('Authorization', token);
    return this.http.get<Treatment[]>(`${this.url}`, {
      headers: hdr
    });
  }

  addTreatment(t: Treatment) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders();
    hdr.append('Authorization', token);
    const body= JSON.parse(JSON.stringify(t));
    return this.http.post(this.url, body,  {
      headers: hdr
    });
  }

  deleteTreatment(t: Treatment) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders();
    hdr.append('Authorization', token);
    return this.http.delete(this.url + '/' + t.id,  {
      headers: hdr
    });
  }

  updateTreatment(t: Treatment) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders();
    hdr.append('Authorization', token);
    const body= JSON.parse(JSON.stringify(t));
    return this.http.put(this.url, body,  {
      headers: hdr
    });
  }

}
