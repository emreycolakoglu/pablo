import { Authentication } from "../repository/business/authentication";

export default class AuthController {
  public static async login(req, res) {
    const user = await Authentication.login(req.body.email, req.body.password);
    res.json(user);
  }

  public static async register(req, res) {
    const user = await Authentication.passwordRegister(req.body.email, req.body.password);
    res.json(user);
  }
}