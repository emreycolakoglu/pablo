import {
  IServiceActionInstance,
  IMongoServiceActionInstance
} from "../../../database/models";
import { ServiceActionInstanceSchema } from "../../../database/mongo/index";
import * as Q from "q";

export class ServiceActionInstanceRepository {
  public static async create(request: any): Promise<IServiceActionInstance> {
    const d = Q.defer<IServiceActionInstance>();

    ServiceActionInstanceSchema.create(request)
      .then((newService: IMongoServiceActionInstance) => {
        d.resolve(newService);
      })
      .catch((error: any) => {
        d.reject(error);
      });

    return d.promise;
  }

  public static async get(id: string): Promise<IServiceActionInstance> {
    const d = Q.defer<IServiceActionInstance>();

    ServiceActionInstanceSchema.findById(id)
      .then((result: IMongoServiceActionInstance) => {
        d.resolve(result);
      })
      .catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async update(
    id: string,
    request: any
  ): Promise<IServiceActionInstance> {
    const d = Q.defer<IServiceActionInstance>();

    ServiceActionInstanceSchema.findByIdAndUpdate(id, request, { upsert: true })
      .then((result: IMongoServiceActionInstance) => {
        d.resolve(result);
      })
      .catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async patch(
    id: string,
    request: any
  ): Promise<IServiceActionInstance> {
    const d = Q.defer<IServiceActionInstance>();

    ServiceActionInstanceSchema.findById(id)
      .then((result: IMongoServiceActionInstance) => {
        delete request._id;
        for (const property in request) {
          result[property] = request[property];
        }
        return result.save();
      })
      .then((result: IMongoServiceActionInstance) => {
        d.resolve(result);
      })
      .catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async delete(id: string): Promise<boolean> {
    const d = Q.defer<boolean>();

    ServiceActionInstanceSchema.findByIdAndRemove(id)
      .then((result: IMongoServiceActionInstance) => {
        d.resolve(true);
      })
      .catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async list(query): Promise<IServiceActionInstance[]> {
    const d = Q.defer<IServiceActionInstance[]>();

    ServiceActionInstanceSchema.find({})
      .skip(query.skip)
      .limit(query.take)
      .then((result: IMongoServiceActionInstance[]) => {
        d.resolve(result);
      })
      .catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }

  public static async getActionsOfService(
    serviceId
  ): Promise<IServiceActionInstance[]> {
    const d = Q.defer<IServiceActionInstance[]>();

    ServiceActionInstanceSchema.find({
      service: serviceId
    })
      .then((result: IMongoServiceActionInstance[]) => {
        d.resolve(result);
      })
      .catch((err: any) => {
        d.reject(err);
      });

    return d.promise;
  }
}
