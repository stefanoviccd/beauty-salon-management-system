import { Treatment } from './Treatment';
import { User } from './User';

export class Appointment {
  constructor(
    public user: User,
    public date: Date,
    public time: string,
    public treatment: Treatment,
    public status: string
   ) {}
 }
