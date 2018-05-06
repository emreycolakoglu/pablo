import { IServiceInstance, IMongoServiceInstance } from "../../../database/models";
import { ServiceInstanceSchema } from "../../../database/mongo/index";
import * as Q from "q";

export class ServiceInstanceRepository {
  public static async create(request: any): Promise<IServiceInstance> {
    const d = Q.defer<IServiceInstance>();

    ServiceInstanceSchema.create(request).then((newService: IMongoServiceInstance) => {
      d.resolve(newService);
    }).catch((error: any) => {
      d.reject(error);
    });

    return d.promise;
  }

  public static async get(id: string): Promise<IServiceInstance> {
    const d = Q.defer<IServiceInstance>();

    ServiceInstanceSchema.findById(id).then((result: IMongoServiceInstance) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async update(id: string, request: any): Promise<IServiceInstance> {
    const d = Q.defer<IServiceInstance>();

    ServiceInstanceSchema.findByIdAndUpdate(id, request, { upsert: true }).then((result: IMongoServiceInstance) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async patch(id: string, request: any): Promise<IServiceInstance> {
    const d = Q.defer<IServiceInstance>();

    ServiceInstanceSchema.findById(id).then((result: IMongoServiceInstance) => {
      delete request._id;
      for (const property in request) {
        result[property] = request[property];
      }
      return result.save();
    }).then((result: IMongoServiceInstance) => {
      d.resolve(result);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async delete(id: string): Promise<boolean> {
    const d = Q.defer<boolean>();

    ServiceInstanceSchema.findByIdAndRemove(id).then((result: IMongoServiceInstance) => {
      d.resolve(true);
    }).catch((err: any) => {
      d.reject(err);
    });

    return d.promise;
  }

  public static async list(query): Promise<IServiceInstance[]> {
    const d = Q.defer<IServiceInstance[]>();

    ServiceInstanceSchema.find({})
      .skip(query.skip)
      .limit(query.take)
      .then((result: IMongoServiceInstance[]) => {
        d.resolve(result);
      }).catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async usersServiceInstances(userId: any, serviceId: any): Promise<IServiceInstance[]> {
    const d = Q.defer<IServiceInstance[]>();

    ServiceInstanceSchema.find({
      owner: userId,
      serviceType: serviceId
    })
      .then((result: IMongoServiceInstance[]) => {
        d.resolve(result);
      }).catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }
}