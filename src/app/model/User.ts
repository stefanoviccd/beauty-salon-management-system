import { Role } from './Role';

export class User {
  constructor(
    public username: string,
    public password: string,
    public name: string,
    public lastName: string,
    public contact: string,
    public role: Role
   ) {}
 }
