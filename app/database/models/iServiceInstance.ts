import { IBase, IService, IUser } from "./index";

export interface IServiceInstance {
  serviceType: IService;
  owner: IUser;
  accessToken: string;
  refreshToken: string;
  username: string;
  password: string;
  endpoint: string;
}

export interface IMongoServiceInstance extends IServiceInstance, IBase { }