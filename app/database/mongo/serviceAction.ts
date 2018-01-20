import { Document, Schema, model } from "mongoose";
import { IMongoServiceAction } from "../models";
import * as slug from "slug";

const serviceActionSchema = new Schema({
  name: { type: String },
  key: { type: String },
  service: { type: Schema.Types.ObjectId, ref: "Service" },
  inputs: [{ type: Schema.Types.Mixed }],
  outputs: [{ type: Schema.Types.Mixed }],
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoServiceAction>this._doc;
      const now = new Date();
      doc.key = slug(doc.name.toLowerCase());
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.modifiedAt = now;
    }
    next();
    return this;
  });

serviceActionSchema.set("toJSON", { virtuals: true });

export let ServiceActionSchema = model<IMongoServiceAction>("ServiceAction", serviceActionSchema, "serviceActions", true);