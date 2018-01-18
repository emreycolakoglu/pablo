import AuthController from "./controllers/authController";
import { Authentication } from "./repository/business/authentication";
import ServiceController from "./controllers/serviceController";
import ServiceActionController from "./controllers/serviceActionController";
import * as express from "express";
const routes = express.Router();


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

routes.route("/services")
  .get(ServiceController.getList)
  .post(Authentication.checkToken("admin"), ServiceController.create);
routes.route("/services/:id")
  .get(ServiceController.getWithId)
  .put(Authentication.checkToken("admin"), ServiceController.update)
  .patch(Authentication.checkToken("admin"), ServiceController.patch)
  .delete(Authentication.checkToken("admin"), ServiceController.delete);

routes.route("/serviceActions")
  .get(ServiceActionController.getList)
  .post(Authentication.checkToken("admin"), ServiceActionController.create);
routes.route("/serviceActions/:id")
  .get(ServiceActionController.getWithId)
  .put(Authentication.checkToken("admin"), ServiceActionController.update)
  .patch(Authentication.checkToken("admin"), ServiceActionController.patch)
  .delete(Authentication.checkToken("admin"), ServiceActionController.delete);

export default routes;