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

    return this.http.post(this.url, body);

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
