export interface IServiceActionInput {
  name: string;
  type: IServiceActionInputType;
}
export enum IServiceActionInputType {
  Text = 1,
  Number = 2
}