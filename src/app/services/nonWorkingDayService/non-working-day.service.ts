import { Injectable } from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { DateOff } from 'src/app/model/DateOff';

@Injectable({
  providedIn: 'root'
})
export class NonWorkingDayService {

  url = 'https://localhost:7018/api/NonWorkingDays';

  constructor(private http: HttpClient) { }

  addDayOff(d: Date){
    const data = {
      day: d.getUTCDate(),
      month: d.getUTCMonth() + 1,
      year: d.getUTCFullYear()
    };
    const body= JSON.parse(JSON.stringify(data));
    // eslint-disable-next-line @typescript-eslint/quotes
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append('Authorization', token);

    return this.http.post(this.url, body, {
      headers: hdr
    });

  }

  getDaysOff(){
    const token=window.localStorage.getItem('token');
    const hdr = new HttpHeaders();
    hdr.append('Authorization', token);
    return this.http.get<DateOff[]>(`${this.url}`, {
      headers: hdr
    });

  }

}
