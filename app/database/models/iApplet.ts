import { IServiceActionInstance, IUser, IBase } from "./index";

export interface IApplet {
  name: string;
  slug: string;
  inProgress: boolean;
  interval: number;
  nextRunDate: Date;
  lastRunDate: Date;
  owner: IUser;
  actions: IServiceActionInstance[];
}

export interface IMongoApplet extends IApplet, IBase { }