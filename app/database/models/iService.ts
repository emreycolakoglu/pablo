import { IBase } from "./iBase";
import { IServiceAction } from "./iServiceAction";

export interface IService extends IBase {
  name: string;
  description: string;
  logo: string;
  actions: IServiceAction[];
}