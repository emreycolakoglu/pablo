import { IBase, IServiceAction, IUser, IApplet, IServiceActionInput, IServiceInstance } from "./index";

export interface IServiceActionInstance {
  serviceAction: IServiceAction;
  serviceInstance: IServiceInstance;
  applet: IApplet;
  /** action instance gecici bellek */
  payload: any;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
  order: number;
}

export interface IMongoServiceActionInstance extends IServiceActionInstance, IBase { }