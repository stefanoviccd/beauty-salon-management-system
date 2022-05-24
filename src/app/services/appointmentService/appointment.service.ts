/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from 'src/app/model/Appointment';
import { Role } from 'src/app/model/Role';
import { Treatment } from 'src/app/model/Treatment';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  url = 'https://localhost:7018/api/Appointment';

  pipe = new DatePipe('en-US');
  public appointments;
  constructor(private http: HttpClient) {
  }

  getScheduledAppointments(){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    return this.http.get<Appointment[]>(`${this.url+"/scheduled"}`, {
      headers: hdr
    });
  }

  getRequiredAppointments(){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    return this.http.get<Appointment[]>(`${this.url+"/required"}`,  {
      headers: hdr
    });
  }
  getFreeAppointmentsForTreatment(date: Date, selectedTreatment: number) {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();
    const body = JSON.parse(
      JSON.stringify({
        Day: day,
        Month: month,
        Year: year
      }));
      const token=window.localStorage.getItem("token");
      const hdr = new HttpHeaders();
      hdr.append("Authorization", token);
    return this.http.post<string[]>(`${this.url + '/freeAppointmentTime/' + selectedTreatment}`, body, {
      headers: hdr
    });
  }



  delete(e: Appointment){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    return this.http.delete(this.url + '/' + e.id,  {
      headers: hdr
    });
  }

  reject(e: Appointment){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    return this.http.put(this.url + '/reject', e.id,  {
      headers: hdr
    });
  }

  schedule(e: Appointment){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    return this.http.put(this.url + '/accept', e.id,  {
      headers: hdr
    });
  }

  getUserAppointments(u: User){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    return this.http.get<Appointment[]>(`${this.url + "/" + u.email}`,  {
      headers: hdr
    });
  }

  addAppointment(treatmentId: number, username: string, day: number, month: number, year: number, hour: number, minute: number){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    const body= JSON.parse(JSON.stringify({
      Email: username,
      TreatmentId: treatmentId,
      Day: day,
      Month: month,
      Year: year,
      Hour: hour,
      Minute: minute
    }));

    return this.http.post(this.url, body,  {
      headers: hdr
    });

  }

  isTimeAvailable(day: number, month: number, year: number, hour: number, minute: number){
    const token=window.localStorage.getItem("token");
    const hdr = new HttpHeaders();
    hdr.append("Authorization", token);
    const body= JSON.parse(JSON.stringify({
      Day: day,
      Month: month,
      Year: year,
      Hour: hour,
      Minute: minute
    }));

    return this.http.post(this.url + "/checkTime", body,  {
      headers: hdr
    });
  }
}
