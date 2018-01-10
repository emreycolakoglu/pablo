import { IBase, IService, IUser } from "./index";

export interface IServiceInstance {
  serviceType: IService;
  owner: IUser;
  accessToken: string;
}

export interface IMongoServiceInstance extends IServiceInstance, IBase { }