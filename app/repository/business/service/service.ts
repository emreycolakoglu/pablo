import { IService, IMongoService } from "../../../database/models";
import { ServiceSchema } from "../../../database/mongo/index";
import * as Q from "q";

export class ServiceRepository {
  public static async create(request: any): Promise<IService> {
    const d = Q.defer<IService>();

    ServiceSchema.create(request).then((newService: IMongoService[]) => {
      d.resolve(newService[0]);
    }).catch((error: any) => {
      d.reject(error);
    });

    return d.promise;
  }

  public static async get(id: string): Promise<IService> {
    const d = Q.defer<IService>();

    ServiceSchema.findById(id).then((result: IMongoService) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async update(id: string, request: any): Promise<IService> {
    const d = Q.defer<IService>();

    ServiceSchema.findByIdAndUpdate(id, request, { upsert: true }).then((result: IMongoService) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async patch(id: string, request: any): Promise<IService> {
    const d = Q.defer<IService>();

    ServiceSchema.findById(id).then((result: IMongoService) => {
      delete request._id;
      for (const property in request) {
        result[property] = request[property];
      }
      return result.save();
    }).then((result: IMongoService) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async delete(id: string): Promise<boolean> {
    const d = Q.defer<boolean>();

    ServiceSchema.findByIdAndRemove(id).then((result: IMongoService) => {
      d.resolve(true);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async list(query): Promise<IService[]> {
    const d = Q.defer<IService[]>();

    ServiceSchema.find({})
      .skip(query.skip)
      .limit(query.take)
      .then((result: IService[]) => {
        d.resolve(result);
      }).catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }
}