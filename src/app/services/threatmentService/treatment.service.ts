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
    return this.http.get<Treatment[]>(this.url);
  }

  addTreatment(t: Treatment) {
    const body= JSON.parse(JSON.stringify(t));
    return this.http.post(this.url, body);
  }

  deleteTreatment(t: Treatment) {
    return this.http.delete(this.url + '/' + t.id);
  }

  updateTreatment(t: Treatment) {
    const body= JSON.parse(JSON.stringify(t));
    return this.http.put(this.url, body);
  }

}
