import { Time } from '@angular/common';
import { Treatment } from './Treatment';
import { User } from './User';

export class Appointment {
  constructor(
    public user: User,
    public date: Date,
    public time: Time,
    public treatment: Treatment,
    public status: string
   ) {}
 }