import { IBase } from "./iBase";

export interface IUser {
  email: string;
  password: string;
  name: string;
  roles: string[];
}

export interface IMongoUser extends IUser, IBase { }