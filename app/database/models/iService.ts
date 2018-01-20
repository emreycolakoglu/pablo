import { IBase } from "./iBase";
import { IServiceAction } from "./iServiceAction";

export interface IService {
  name: string;
  key: string;
  description: string;
  logo: string;
  requireAuth: boolean;
  authenticationMethod: AuthenticationMethods;
  actions: IServiceAction[];
}

export enum AuthenticationMethods {
  UserPass = 1,
  OAuth = 2
}

export interface IMongoService extends IService, IBase { }