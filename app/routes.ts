import AuthController from "./controllers/authController";
import { Authentication } from "./repository/business/authentication";
import ServiceController from "./controllers/serviceController";
import ServiceInstanceController from "./controllers/serviceInstanceController";
import ServiceActionController from "./controllers/serviceActionController";
import ServiceActionInstanceController from "./controllers/serviceActionInstanceController";
import AppletController from "./controllers/appletController";
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
routes.route("/services/:id/actions")
  .get(ServiceActionController.getActionsOfService);

routes.route("/serviceInstances")
  .get(Authentication.checkToken("admin"), ServiceInstanceController.usersServiceInstances)
  .post(Authentication.checkToken("admin"), ServiceInstanceController.create);
routes.route("/serviceInstances/:id")
  .get(ServiceInstanceController.getWithId)
  .put(Authentication.checkToken("admin"), ServiceInstanceController.update)
  .patch(Authentication.checkToken("admin"), ServiceInstanceController.patch)
  .delete(Authentication.checkToken("admin"), ServiceInstanceController.delete);

routes.route("/serviceActions")
  .get(ServiceActionController.getList)
  .post(Authentication.checkToken("admin"), ServiceActionController.create);
routes.route("/serviceActions/:id")
  .get(ServiceActionController.getWithId)
  .put(Authentication.checkToken("admin"), ServiceActionController.update)
  .patch(Authentication.checkToken("admin"), ServiceActionController.patch)
  .delete(Authentication.checkToken("admin"), ServiceActionController.delete);

routes.route("/serviceActionInstances")
  .get(ServiceActionInstanceController.getList)
  .post(Authentication.checkToken("admin"), ServiceActionInstanceController.create);
routes.route("/serviceActionInstances/:id")
  .get(ServiceActionInstanceController.getWithId)
  .put(Authentication.checkToken("admin"), ServiceActionInstanceController.update)
  .patch(Authentication.checkToken("admin"), ServiceActionInstanceController.patch)
  .delete(Authentication.checkToken("admin"), ServiceActionInstanceController.delete);

routes.route("/applets")
  .get(AppletController.getList)
  .post(Authentication.checkToken("admin"), AppletController.create);
routes.route("/applets/:id")
  .get(AppletController.getWithId)
  .put(Authentication.checkToken("admin"), AppletController.update)
  .patch(Authentication.checkToken("admin"), AppletController.patch)
  .delete(Authentication.checkToken("admin"), AppletController.delete);

export default routes;