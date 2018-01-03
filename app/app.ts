import * as path from "path";
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as helmet from "helmet";
import * as compression from "compression";
import routes from "./routes";
import * as cors from "cors";
//import * as tasks from "./helpers/taskRunner";
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
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(helmet());
    this.express.set('view engine', 'ejs');
    this.express.set('views', path.join(__dirname, '../dist/views'));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use("/", function(req, res) {  
      res.render('index', { title: 'The index page!' })
    });
    this.express.use("/panel", express.static("/panel"));
    this.express.use("/api", <express.Router>routes);
  }

  private databaseConnection(): void {
    (<any>mongoose).Promise = Promise;
    const promise = mongoose.connect(process.env.MONGOSTRING, {
      useMongoClient: true
    } as mongoose.ConnectionOptions, (err: any) => {
      if (err) {
        logger.error(err);
      }
      else {
        logger.info("Mongoose running");
      }
    });
  }

  private postInitSetup() {
    //tasks.scheduleAll();
  }
}

export default new App().express;