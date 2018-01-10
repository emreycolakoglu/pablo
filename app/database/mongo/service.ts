import { Document, Schema, model } from "mongoose";
import { IMongoService } from "../models";

const serviceSchema = new Schema({
  name: { type: String },
  description: { type: String },
  logo: { type: String },
  actions: [{ type: Schema.Types.ObjectId, ref: "ServiceAction" }],
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoService>this._doc;
      const now = new Date();
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.modifiedAt = now;
    }
    next();
    return this;
  });

serviceSchema.set("toJSON", { virtuals: true });

export let ServiceSchema = model<IMongoService>("Service", serviceSchema, "services", true);