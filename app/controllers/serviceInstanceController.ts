import { ServiceInstanceRepository } from "../repository/business/serviceInstance";
import { IMongoServiceInstance } from "../database/models";

export default class ServiceController {
  public static async getList(req, res) {
    ServiceInstanceRepository.list(req.query).then((ds: IMongoServiceInstance[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async getWithId(req, res) {
    ServiceInstanceRepository.get(req.params.id).then((ds: IMongoServiceInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async create(req, res) {
    ServiceInstanceRepository.create(req.body).then((ds: IMongoServiceInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async update(req, res) {
    ServiceInstanceRepository.update(req.params.id, req.body).then((ds: IMongoServiceInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async patch(req, res) {
    ServiceInstanceRepository.patch(req.params.id, req.body).then((ds: IMongoServiceInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async delete(req, res) {
    ServiceInstanceRepository.delete(req.params.id).then((ds: boolean) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }
}