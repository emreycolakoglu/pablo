import { AppletRepository } from "../repository/business/applet";
import { IMongoApplet } from "../database/models";

export default class AppletController  {
  public static async getList(req, res) {
    AppletRepository.list(req.query).then((ds: IMongoApplet[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async getWithId(req, res) {
    AppletRepository.get(req.params.id).then((ds: IMongoApplet) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async create(req, res) {
    AppletRepository.create(req.body).then((ds: IMongoApplet[]) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async update(req, res) {
    AppletRepository.update(req.params.id, req.body).then((ds: IMongoApplet) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async patch(req, res) {
    AppletRepository.patch(req.params.id, req.body).then((ds: IMongoApplet) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async delete(req, res) {
    AppletRepository.delete(req.params.id).then((ds: boolean) => {
      res.json(ds);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }
}