import { IBase } from "./iBase";
import { IServiceActionInput } from "./iServiceActionInput";

export interface IServiceAction {
  name: string;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
}

export interface IMongoServiceAction extends IServiceAction, IBase { }