import { IService, IServiceActionInput, IBase } from "./index";

export interface IServiceAction {
  name: string;
  key: string;
  service: IService;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
}

export interface IMongoServiceAction extends IServiceAction, IBase { }