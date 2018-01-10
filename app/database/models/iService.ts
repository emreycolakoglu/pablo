import { IBase } from "./iBase";
import { IServiceAction } from "./iServiceAction";

export interface IService {
  name: string;
  description: string;
  logo: string;
  actions: IServiceAction[];
}

export interface IMongoService extends IService, IBase { }