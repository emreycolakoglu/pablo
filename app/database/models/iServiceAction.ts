import { IService, IServiceActionInput, IBase } from "./index";

export interface IServiceAction {
  name: string;
  key: string;
  service: IService;
  inputs: IServiceActionInput[];
  outputs: IServiceActionInput[];
}

export interface IMongoServiceAction extends IServiceAction, IBase {}

/**
 * input arrayinden isim kullanarak input bul
 * @param array
 * @param name
 */
export function getInputWithName(
  array: any[],
  name: string
): IServiceActionInput {
  const found = array.filter((item: IServiceActionInput) => {
    return item.name == name;
  });

  if (!found || (found && found.length == 0))
    throw {
      message: `Input with name: ${name} Not found`
    };
  else if (found && found.length > 0) return found[0];
}

export function replacePlaceholderInInput(
  value: string,
  previousActionOutputs: IServiceActionInput[]
): string {
  let foundAndReplaced: boolean = false;
  // tum outputlar icin don, eger bulursan replace et
  if (previousActionOutputs && previousActionOutputs.length > 0) {
    previousActionOutputs.map((actionOutput: IServiceActionInput) => {
      if (value.indexOf(actionOutput.key) > -1) {
        value = value.replace(`{${actionOutput.key}}`, actionOutput.value);
        foundAndReplaced = true;
      }
    });
  }

  if (foundAndReplaced) return value;
  else throw new Error("NOT FOUND");
}

/** check for curly braces if value needs replacing */
export function inputNeedsReplacing(value: string) {
  if (value.indexOf("{") > -1 && value.indexOf("}") > -1) {
    return true;
  } else {
    return false;
  }
}
