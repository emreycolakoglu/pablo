import * as express from "express";
const routes = express.Router();

routes.use(function (req, res, next) {
  if (!req.query.limit) req.query.limit = 10;
  else req.query.limit = parseInt(req.query.limit);
  if (!req.query.skip) req.query.skip = 0;
  else req.query.skip = parseInt(req.query.skip);
  next();
});

export default routes;