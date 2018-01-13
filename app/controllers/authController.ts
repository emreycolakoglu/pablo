import { Authentication } from "../repository/business/authentication";

export default class AuthController {
  public static async login(req, res) {
    Authentication.login(req.body.email, req.body.password).then((user) => {
      res.json(user);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }

  public static async register(req, res) {
    Authentication.passwordRegister(req.body.email, req.body.password).then((user) => {
      res.json(user);
    }).catch((error: any) => {
      res.status(500).send({ message: error.message });
    });
  }
}