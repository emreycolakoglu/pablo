import { IBase, IServiceAction, IUser, IApplet } from "./index";

export interface IServiceActionInstance {
  serviceAction: IServiceAction;
  applet: IApplet;
  payload: any;
}

export interface IMongoServiceActionInstance extends IServiceActionInstance, IBase { }