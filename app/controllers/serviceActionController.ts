import { ServiceActionRepository } from "../repository/business/serviceAction";
import { IMongoServiceAction } from "../database/models";

export default class ServiceController {
  public static async getList(req, res) {
    ServiceActionRepository.list(req.query).then((ds: IMongoServiceAction[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async getActionsOfService(req, res) {
    ServiceActionRepository.getActionsOfService(req.params.id).then((ds: IMongoServiceAction[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async getWithId(req, res) {
    ServiceActionRepository.get(req.params.id).then((ds: IMongoServiceAction) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async create(req, res) {
    ServiceActionRepository.create(req.body).then((ds: IMongoServiceAction) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async update(req, res) {
    ServiceActionRepository.update(req.params.id, req.body).then((ds: IMongoServiceAction) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async patch(req, res) {
    ServiceActionRepository.patch(req.params.id, req.body).then((ds: IMongoServiceAction) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async delete(req, res) {
    ServiceActionRepository.delete(req.params.id).then((ds: boolean) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }
}