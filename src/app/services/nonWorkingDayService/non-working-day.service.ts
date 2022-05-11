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
    let data = {
      day: d.getUTCDate(),
      month: d.getUTCMonth() + 1,
      year: d.getUTCFullYear()
    }
   
    const body= JSON.parse(JSON.stringify(data));

    this.http.post(this.url, body).subscribe(
      data => {
      alert("Success Adding");
    },
    error => {
      alert("Error Adding");
    });

  }

  getDaysOff(){
    return this.http.get<DateOff[]>(`${this.url}`);
    // this.http.get(this.url).subscribe(
    //   data => {
    //   console.log(data);
    //   return data;
    // },
    // error => {
    //   alert(error);
    // });

  }

}
