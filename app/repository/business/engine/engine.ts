import * as moment from "moment";
import * as Q from "q";
import * as scheduler from "node-schedule";
import logger from "../../../logger";
import { ActionRepository } from "./";
import { AppletSchema, ServiceActionInstanceSchema } from "../../../database/mongo";
import { IServiceActionInstance, IMongoServiceActionInstance } from "../../../database/models";
import { RedditRepository } from "../reddit";

export class Engine {

  private static _events = [{
    name: "cycle",
    id: "",
    schedule: "*/3 * * * * *",
    callback: function () { Engine.cycle(); }
  }];

  /**
   * choo choo train!
   */
  public static async start(): Promise<any> {
    const d = Q.defer();

    logger.info("engine started");
    Engine._events.forEach(function (element: any) {
      element.id = scheduler.scheduleJob(element.schedule, element.callback);
    }, this);
    logger.debug("events scheduled: " + Engine._events.length);

    return d.promise;
  }

  public static async cycle(): Promise<any> {
    const d = Q.defer();
    const self = this;

    AppletSchema
      .find({
        inProgress: false
      })
      .where("nextRunDate").lt(Date.now())
      .populate({
        path: "actions",
        options: { sort: { order: 1 } }
      })
      .exec(function (err, applets) {
        if (!err) {
          logger.debug(`found ${applets.length} applets to run this cycle`);
          applets.forEach(function (applet) {
            logger.debug(`running ${applet.name}`);
            applet.lastRunDate = new Date();
            applet.inProgress = true;
            applet.nextRunDate = moment().add(applet.interval, "s").toDate();
            applet.save();

            self.chainActions(applet.actions)
              .then(function (result) {
                logger.info(`${applet.name} finished succesfully`);
                applet.inProgress = false;
                applet.save();
              }, function (reason) {
                logger.info(`${applet.name} finished with errors`);
                applet.inProgress = false;
                logger.error(reason);
                applet.save();
              });
            logger.debug(`got: ${applet.name}, ${applet.lastRunDate}, ${applet.nextRunDate}`);
          }, this);
        }
        else {
          d.reject(err);
        }
      });

    return d.promise;
  }

  public static async chainActions(actions: IServiceActionInstance[]) {
    const d = Q.defer();
    const self = this;

    ServiceActionInstanceSchema.populate(actions, [{
      path: "serviceAction",
      populate: {
        path: "service"
      }
    }, {
      path: "applet"
    }])
      .then(function (actions: IMongoServiceActionInstance[]) {
        logger.info(`${actions.length} actions found, chaining`);
        const chain = actions.reduce(function (previous, item) {
          return previous.then(function (previousValue) {
            logger.info(`action '${item.serviceAction.name}' done, calling the next`);
            return self.handleAction(item, previousValue);
          });
        }, Q.resolve({} as any));

        chain.then((result: any) => {
          d.resolve(result);
        });
      });

    return d.promise;
  }

  public static async handleAction(action: IMongoServiceActionInstance, previousAction: IMongoServiceActionInstance) {
    const d = Q.defer();
    logger.debug(`an action with '${action.serviceAction.service.name}' type is starting`);

    switch (action.serviceAction.service.key) {
      case "reddit":
        ActionRepository.handleRedditAction(action, previousAction).then(function (result) {
          logger.info(`handle action: ${action.serviceAction.name}, action is complete, resolving`);
          d.resolve(result);
        }, function (reason) {
          logger.error(`handle action: ${action.serviceAction.name}, action has errors, rejecting`);
          d.reject(reason);
        });
        break;
      default:
        logger.debug(`handleAction, default action, resolving`);
        d.resolve({} as any);
        break;
    }

    return d.promise;
  }
}