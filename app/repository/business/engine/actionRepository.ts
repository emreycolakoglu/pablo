import * as Q from "q";
import { IServiceActionInstance, IMongoServiceActionInstance } from "../../../database/models";
import { RedditRepository } from "../reddit";
import logger from "../../../logger";

export class ActionRepository {

  /**
   * this action must distinguish between service actions of a service
   * @param action
   * @param previousAction
   */
  public static async handleRedditAction(action: IMongoServiceActionInstance, previousAction: IMongoServiceActionInstance): Promise<any> {
    const d = Q.defer();
    logger.debug(`reddit action '${action.serviceAction.name}' is starting`);

    switch (action.serviceAction.key) {
      case "get-hot-list-of-subreddit":
        RedditRepository.checkHotPost(action, previousAction).then((actionResult: any) => {
          logger.debug(`reddit action '${action.serviceAction.name}' is resolving`);
          d.resolve(actionResult);
        }).catch((error) => {
          logger.error(`reddit action '${action.serviceAction.name}' is rejecting, ${error}`);
          d.reject(error);
        });
        break;
      default:
        break;
    }

    return d.promise;
  }
}