import { Document, Schema, model } from "mongoose";
import { IMongoUser } from "../models";

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  createdAt: { type: Date, required: false },
  modifiedAt: { type: Date, required: false }
})
  .pre("save", function (next) {
    if (this._doc) {
      const doc = <IMongoUser>this._doc;
      const now = new Date();
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.modifiedAt = now;
    }
    next();
    return this;
  });

userSchema.set("toJSON", { virtuals: true });

export let UserSchema = model<IMongoUser>("User", userSchema, "users", true);