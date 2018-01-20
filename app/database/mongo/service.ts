import { Document, Schema, model } from "mongoose";
import { IMongoService } from "../models";
import * as slug from "slug";

const serviceSchema = new Schema({
  name: { type: String },
  key: { type: String },
  description: { type: String },
  logo: { type: String },
  requireAuth: { type: Boolean },
  authenticationMethod: { type: Number },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoService>this._doc;
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

serviceSchema.virtual("actions", {
  ref: "ServiceAction",
  localField: "_id",
  foreignField: "service"
});

serviceSchema.set("toJSON", { virtuals: true });

export let ServiceSchema = model<IMongoService>("Service", serviceSchema, "services", true);