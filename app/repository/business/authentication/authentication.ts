import * as Q from "q";
import { UserSchema } from "../../../database/mongo";
import { IUser, IMongoUser } from "../../../database/models/index";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

export class Authentication {
  public static async passwordRegister(email: string, password: string) {
    const d = Q.defer();

    try {
      const exists = await this.exists(email);
      if (!exists) {
        UserSchema.create({
          email: email,
          password: password,
          name: email
        }).then((newUser: IMongoUser) => {
          const token = this.generateToken(newUser);
          d.resolve({
            user: newUser,
            token: token
          });
        }).catch((error: any) => {
          d.reject(error);
        });
      }
      else {
        d.resolve(undefined);
      }
    } catch (error) {
      d.reject(error);
    }

    return d.promise;
  }

  public static async login(email: string, password: string) {
    const d = Q.defer();

    UserSchema.findOne({
      email: email,
      password: password
    }).then((existingUser: IMongoUser) => {
      if (existingUser) {
        const token = this.generateToken(existingUser);
        d.resolve({
          user: existingUser,
          token: token
        });
      }
      else {
        d.reject({
          message: "No user found"
        });
      }
    }).catch((error: any) => {
      d.reject(error);
    });

    return d.promise;
  }

  private static async exists(email: string) {
    const d = Q.defer();

    UserSchema.findOne({
      email: email
    }).then((existingUser: IUser) => {
      d.resolve(existingUser);
    }).catch((error: any) => {
      d.reject(error);
    });

    return d.promise;
  }

  private static generateToken(user: IMongoUser) {
    const self = this;
    const payload = {
      userid: user.id,
      iat: moment().unix(),
      exp: moment().add(14, "days").unix()
    };
    return jwt.sign(payload, process.env.JWTSECRET);
  }

}