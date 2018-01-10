import { IBase, IServiceAction, IUser } from "./index";

export interface IServiceActionInstance {
  serviceAction: IServiceAction;
  owner: IUser;
}

export interface IMongoServiceActionInstance extends IServiceActionInstance, IBase { }