import * as path from "path";
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as helmet from "helmet";
import * as compression from "compression";
import * as raven from "raven";
import routes from "./routes";
import * as cors from "cors";
import { Engine } from "./repository/business/engine";
import logger from "./logger";
// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.databaseConnection();
    this.postInitSetup();
  }

  // Configure Express middleware.
  private middleware(): void {
    if (process.env.SENTRY) {
      raven.config(process.env.SENTRY).install();
      this.express.use(raven.requestHandler());
      this.express.use(raven.errorHandler());
    }
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(helmet());
    this.express.set("view engine", "ejs");
    this.express.set("views", path.join(__dirname, "../dist/views"));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.get("/", function(req, res) {
      res.render("index");
    });
    this.express.get("/panel", function(req, res) {
      res.render("panel");
    });
    this.express.use(
      "/node_modules",
      express.static(path.join(__dirname, "../node_modules"))
    );
    this.express.use("/asset", express.static(path.join(__dirname, "./panel")));
    this.express.use("/api", <express.Router>routes);
  }

  private databaseConnection(): void {
    (<any>mongoose).Promise = Promise;
    const promise = mongoose.connect(process.env.MONGOSTRING, (err: any) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info("Mongoose running");
      }
    });
  }

  private postInitSetup() {
    Engine.start();
  }
}

export default new App().express;
