import { IApplet, IMongoApplet } from "../../../database/models";
import { AppletSchema } from "../../../database/mongo";
import * as Q from "q";

export class AppletRepository {
  public static async create(request: IApplet): Promise<IApplet> {
    const d = Q.defer<IApplet>();

    if (!request.lastRunDate) {
      const now = new Date();
      request.lastRunDate = now;
      now.setSeconds(now.getSeconds() + request.interval);
      request.nextRunDate = now;
    }

    AppletSchema.create(request).then((newService: IMongoApplet) => {
      d.resolve(newService);
    }).catch((error: any) => {
      d.reject(error);
    });

    return d.promise;
  }

  public static async get(id: string): Promise<IApplet> {
    const d = Q.defer<IApplet>();

    AppletSchema.findById(id).then((result: IMongoApplet) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async update(id: string, request: any): Promise<IApplet> {
    const d = Q.defer<IApplet>();

    AppletSchema.findByIdAndUpdate(id, request, { upsert: true }).then((result: IMongoApplet) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async patch(id: string, request: any): Promise<IApplet> {
    const d = Q.defer<IApplet>();

    AppletSchema.findById(id).then((result: IMongoApplet) => {
      delete request._id;
      for (const property in request) {
        result[property] = request[property];
      }
      return result.save();
    }).then((result: IMongoApplet) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async delete(id: string): Promise<boolean> {
    const d = Q.defer<boolean>();

    AppletSchema.findByIdAndRemove(id).then((result: IMongoApplet) => {
      d.resolve(true);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async list(query): Promise<IApplet[]> {
    const d = Q.defer<IApplet[]>();

    AppletSchema.find({})
      .populate("actions")
      .skip(query.skip)
      .limit(query.take)
      .then((result: IMongoApplet[]) => {
        d.resolve(result);
      }).catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }
}