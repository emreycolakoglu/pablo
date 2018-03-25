import * as moment from "moment";
import * as Q from "q";
import * as scheduler from "node-schedule";
import logger from "../../../logger";
import { AppletSchema, ServiceActionInstanceSchema } from "../../../database/mongo";
import { IServiceActionInstance } from "../../../database/models";
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

            this.chainActions(applet.actions)
              .then(function (result) {
                logger.info(`${applet.name} finished succesfully`);
                applet.inProgress = false;
                applet.save();
              }, function (reason) {
                applet.inProgress = false;
                logger.error(reason);
                applet.save();
              });
            logger.debug(`got: ${applet.name}, ${applet.lastRunDate}, ${applet.nextRunDate}`);
          }, this);
        }
      });

    return d.promise;
  }

  public static async chainActions(actions: IServiceActionInstance[]) {
    const d = Q.defer();

    ServiceActionInstanceSchema.populate(actions, [{
      path: "serviceAction"
    }, {
      path: "applet"
    }])
      .then(function (actions: IServiceActionInstance[]) {
        logger.info(`${actions.length}, actions found, chaining`);
        const chain = actions.reduce(function (previous, item) {
          return previous.then(function (previousValue) {
            logger.info("a previous action is done, calling the next");
            return this.handleAction(item, previousValue);
          });
        }, Q.resolve({}));
      });

    return d.promise;
  }

  public static async handleAction(action: IServiceActionInstance, previousAction: IServiceActionInstance) {
    const d = Q.defer();
    logger.info(`handle action: ${action.serviceAction.name}`);
    switch (action.serviceAction.name) {
      /*case "Reddit":
        reddit.handleRedditStep(action, previousAction).then(function (result) {
          logger.info("handle step:", action.serviceAction.name, action.name, "step is complete, resolving");
          d.resolve(result);
        }, function (reason) {
          logger.info("handle step:", action.serviceAction.name, action.name, "step has errors, rejecting");
          d.reject(reason);
        });
        break;*/
      default:
        d.resolve({});
        break;
    }

    return d.promise;
  }
}