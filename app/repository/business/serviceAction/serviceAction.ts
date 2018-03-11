import { IServiceAction, IMongoServiceAction } from "../../../database/models";
import { ServiceActionSchema } from "../../../database/mongo/index";
import * as Q from "q";

export class ServiceActionRepository {
  public static async create(request: any): Promise<IServiceAction> {
    const d = Q.defer<IServiceAction>();

    ServiceActionSchema.create(request).then((newService: IMongoServiceAction) => {
      d.resolve(newService);
    }).catch((error: any) => {
      d.reject(error);
    });

    return d.promise;
  }

  public static async get(id: string): Promise<IServiceAction> {
    const d = Q.defer<IServiceAction>();

    ServiceActionSchema.findById(id).then((result: IMongoServiceAction) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async update(id: string, request: any): Promise<IServiceAction> {
    const d = Q.defer<IServiceAction>();

    ServiceActionSchema.findByIdAndUpdate(id, request, { upsert: true }).then((result: IMongoServiceAction) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async patch(id: string, request: any): Promise<IServiceAction> {
    const d = Q.defer<IServiceAction>();

    ServiceActionSchema.findById(id).then((result: IMongoServiceAction) => {
      delete request._id;
      for (const property in request) {
        result[property] = request[property];
      }
      return result.save();
    }).then((result: IMongoServiceAction) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async delete(id: string): Promise<boolean> {
    const d = Q.defer<boolean>();

    ServiceActionSchema.findByIdAndRemove(id).then((result: IMongoServiceAction) => {
      d.resolve(true);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async list(query): Promise<IServiceAction[]> {
    const d = Q.defer<IServiceAction[]>();

    ServiceActionSchema.find({})
      .skip(query.skip)
      .limit(query.take)
      .then((result: IMongoServiceAction[]) => {
        d.resolve(result);
      }).catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async getActionsOfService(serviceId): Promise<IServiceAction[]> {
    const d = Q.defer<IServiceAction[]>();

    ServiceActionSchema.find({
      service: serviceId
    })
      .then((result: IMongoServiceAction[]) => {
        d.resolve(result);
      }).catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }
}