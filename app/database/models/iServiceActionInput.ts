export interface IServiceActionInput {
  name: string;
  key: string;
  value: any;
  type: IServiceActionInputType;
}
export enum IServiceActionInputType {
  Text = 1,
  Number = 2,
  Array = 3
}