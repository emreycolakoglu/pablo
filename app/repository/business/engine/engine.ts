import * as moment from "moment";
import * as Q from "q";
import * as scheduler from "node-schedule";
import logger from "../../../logger";
import { AppletSchema } from "../../../database/mongo";

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
          applets.forEach(function (applet) {
            /*applet.lastRunDate = new Date();
            applet.inProgress = true;
            applet.nextRunDate = moment().add(applet.interval, "s").toDate();
            applet.save();

            handleSteps(applet.steps)
              .then(function (result) {
                Slack.send(`${applet.name} finished succesfully`, "status");
                applet.inProgress = false;
                applet.save();
              }, function (reason) {
                applet.inProgress = false;
                logger.error(reason);
                Slack.send(`${applet.name} finished with errors ${reason}`, "status");
                applet.save();
              });*/
              logger.debug("got: " + applet.name);
          }, this);
        }
      });

    return d.promise;
  }
}