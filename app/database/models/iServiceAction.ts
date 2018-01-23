import { IService, IServiceActionInput, IBase } from "./index";

export interface IServiceAction {
  name: string;
  key: string;
  service: IService;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
}

export interface IMongoServiceAction extends IServiceAction, IBase { }

/**
 * input arrayinden isim kullanarak input bul
 * @param array
 * @param name
 */
export function getInputWithName(array: any[], name: string): IServiceActionInput {
  const found = array.filter((item: IServiceActionInput) => {
    return item.name == name;
  });

  if (!found ||  (found && found.length == 0))
    throw {
      message: "Input with name Not found"
    };
  else if (found && found.length > 0)
    return found[0];
}