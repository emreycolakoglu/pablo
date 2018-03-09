import { IBase, IServiceAction, IUser, IApplet, IServiceActionInput } from "./index";

export interface IServiceActionInstance {
  serviceAction: IServiceAction;
  applet: IApplet;
  /** action instance gecici bellek */
  payload: any;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
}

export interface IMongoServiceActionInstance extends IServiceActionInstance, IBase { }