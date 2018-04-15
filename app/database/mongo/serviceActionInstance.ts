import { Document, Schema, model } from "mongoose";
import { IMongoServiceActionInstance } from "../models";

const serviceActionInstanceSchema = new Schema({
  serviceAction: { type: Schema.Types.ObjectId, ref: "ServiceAction" },
  serviceInstance: { type: Schema.Types.ObjectId, ref: "ServiceInstance" },
  applet: { type: Schema.Types.ObjectId, ref: "Applet" },
  payload: { type: Schema.Types.Mixed },
  inputs: [{ type: Schema.Types.Mixed }],
  outputs: [{ type: Schema.Types.Mixed }],
  order: { type: Number },
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