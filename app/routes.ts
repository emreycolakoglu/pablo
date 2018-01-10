import * as express from "express";
import * as sth from "express-serve-static-core";
const routes = express.Router();

import AuthController from "./controllers/authController";

routes.use(function (req, res, next) {
  if (!req.query.limit) req.query.limit = 10;
  else req.query.limit = parseInt(req.query.limit);
  if (!req.query.skip) req.query.skip = 0;
  else req.query.skip = parseInt(req.query.skip);
  next();
});

routes.route("/auth/login")
  .post(AuthController.login);
routes.route("/auth/register")
  .post(AuthController.register);

export default routes;