import { ServiceActionInstanceRepository } from "../repository/business/serviceActionInstance";
import { IMongoServiceActionInstance } from "../database/models";

export default class ServiceController {
  public static async getList(req, res) {
    ServiceActionInstanceRepository.list(req.query).then((ds: IMongoServiceActionInstance[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async getWithId(req, res) {
    ServiceActionInstanceRepository.get(req.params.id).then((ds: IMongoServiceActionInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async create(req, res) {
    ServiceActionInstanceRepository.create(req.body).then((ds: IMongoServiceActionInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async update(req, res) {
    ServiceActionInstanceRepository.update(req.params.id, req.body).then((ds: IMongoServiceActionInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async patch(req, res) {
    ServiceActionInstanceRepository.patch(req.params.id, req.body).then((ds: IMongoServiceActionInstance) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async delete(req, res) {
    ServiceActionInstanceRepository.delete(req.params.id).then((ds: boolean) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }
}