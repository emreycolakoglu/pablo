import { Document, Schema, model } from "mongoose";
import { IMongoServiceInstance } from "../models";
import * as slug from "slug";

const serviceInstanceSchema = new Schema({
  serviceType: { type: Schema.Types.ObjectId, ref: "Service" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  accessToken: { type: String },
  refreshToken: { type: String },
  username: { type: String },
  password: { type: String },
  endpoint: { type: String },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
}).pre("save", function(next) {
  if (this._doc) {
    const doc = <IMongoServiceInstance>this._doc;
    const now = new Date();
    if (!doc.createdAt) {
      doc.createdAt = now;
    }
    doc.modifiedAt = now;
  }
  next();
  return this;
});

serviceInstanceSchema.set("toJSON", { virtuals: true });

export let ServiceInstanceSchema = model<IMongoServiceInstance>(
  "ServiceInstance",
  serviceInstanceSchema,
  "serviceInstances",
  true
);
