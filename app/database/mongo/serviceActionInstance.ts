import { Document, Schema, model } from "mongoose";
import { IMongoServiceActionInstance } from "../models";

const serviceActionInstanceSchema = new Schema({
  serviceAction: { type: Schema.Types.ObjectId, ref: "ServiceAction" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  payload: { type: Schema.Types.Mixed },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoServiceActionInstance>this._doc;
      const now = new Date();
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.modifiedAt = now;
    }
    next();
    return this;
  });

serviceActionInstanceSchema.set("toJSON", { virtuals: true });

export let ServiceActionInstanceSchema = model<IMongoServiceActionInstance>("ServiceActionInstance", serviceActionInstanceSchema, "serviceActionInstances", true);