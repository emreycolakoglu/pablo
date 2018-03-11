import { ServiceRepository } from "../repository/business/service";
import { IMongoService } from "../database/models";

export default class ServiceController {
  public static async getList(req, res) {
    ServiceRepository.list(req.query).then((ds: IMongoService[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async getWithId(req, res) {
    ServiceRepository.get(req.params.id).then((ds: IMongoService) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async create(req, res) {
    ServiceRepository.create(req.body).then((ds: IMongoService) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async update(req, res) {
    ServiceRepository.update(req.params.id, req.body).then((ds: IMongoService) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async patch(req, res) {
    ServiceRepository.patch(req.params.id, req.body).then((ds: IMongoService) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async delete(req, res) {
    ServiceRepository.delete(req.params.id).then((ds: boolean) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }
}