import { IBase } from "./iBase";
import { IServiceActionInput } from "./iServiceActionInput";

export interface IServiceAction extends IBase {
  name: string;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
}