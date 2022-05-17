import { User } from "./User";

export class UserNotification {
  constructor(
    public id: number,
    public user: User,
    public message: string
   ) {}
 }