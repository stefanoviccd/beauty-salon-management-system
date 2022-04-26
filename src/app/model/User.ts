import { Role } from './Role';

export class User {
  constructor(
    public username: string,
    public password: string,
    public role: Role
   ) {}
 }
