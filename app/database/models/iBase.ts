import { Document } from "mongoose";

export interface IBase extends Document {
  createdAt?: Date;
  modifiedAt?: Date;
}
