import { Document, Schema, model } from "mongoose";
import { IMongoServiceAction } from "../models";

const serviceActionSchema = new Schema({
  name: { type: String },
  inputs: [{
    name: String,
    type: Number
  }],
  outputs: [{
    name: String,
    type: Number
  }],
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoServiceAction>this._doc;
      const now = new Date();
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