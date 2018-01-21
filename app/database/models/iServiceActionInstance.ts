import { IBase, IServiceAction, IUser } from "./index";

export interface IServiceActionInstance {
  serviceAction: IServiceAction;
  owner: IUser;
  payload: any;
}

export interface IMongoServiceActionInstance extends IServiceActionInstance, IBase { }