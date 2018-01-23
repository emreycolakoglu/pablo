import { Document, Schema, model } from "mongoose";
import { IMongoApplet } from "../models";
import * as slug from "slug";

const appletSchema = new Schema({
  name: { type: String },
  slug: { type: String },
  inProgress: { type: Boolean },
  interval: { type: Number },
  nextRunDate: { type: Date },
  lastRunDate: { type: Date },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoApplet>this._doc;
      const now = new Date();
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.modifiedAt = now;
    }
    next();
    return this;
  });

appletSchema.virtual("actions", {
  ref: "ServiceActionInstance",
  localField: "_id",
  foreignField: "applet"
});

appletSchema.set("toJSON", { virtuals: true });

export let AppletSchema = model<IMongoApplet>("Applet", appletSchema, "applets", true);