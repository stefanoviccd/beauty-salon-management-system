import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Treatment } from 'src/app/model/Treatment';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  url = 'https://localhost:7018/api/Treatment';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTreatments() {
    const token=window.localStorage.getItem('token');
    const headers = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    return this.http.get<Treatment[]>(`${this.url}`, {
      headers: headers
    });

  }

  addTreatment(t: Treatment) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    const body= JSON.parse(JSON.stringify(t));
    return this.http.post(this.url, body,  {
      headers: hdr
    });
  }

  deleteTreatment(t: Treatment) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    return this.http.delete(this.url + '/' + t.id,  {
      headers: hdr
    });
  }

  updateTreatment(t: Treatment) {
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders()
                    .set('Authorization', "Bearer " + token);
    const body= JSON.parse(JSON.stringify(t));
    return this.http.put(this.url, body,  {
      headers: hdr
    });
  }

}
