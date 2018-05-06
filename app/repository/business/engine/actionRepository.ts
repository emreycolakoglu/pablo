import * as Q from "q";
import { IServiceActionInstance, IMongoServiceActionInstance } from "../../../database/models";
import { RedditRepository } from "../reddit";
import { SlackRepository } from "../slack";
import { WordpressRepository } from "../wordpress";
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
      case "get-top-list-of-subreddit":
        RedditRepository.checkTopPost(action, previousAction).then((actionResult: any) => {
          logger.debug(`reddit action '${action.serviceAction.name}' is resolving`);
          d.resolve(actionResult);
        }).catch((error) => {
          logger.error(`reddit action '${action.serviceAction.name}' is rejecting, ${error}`);
          d.reject(error);
        });
        break;
      case "get-new-list-of-subreddit":
        RedditRepository.checkNewPost(action, previousAction).then((actionResult: any) => {
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

  public static async handleSlackAction(action: IMongoServiceActionInstance, previousAction: IMongoServiceActionInstance): Promise<any> {
    const d = Q.defer();
    logger.debug(`slack action '${action.serviceAction.name}' is starting`);

    switch (action.serviceAction.key) {
      case "send-slack-post":
        SlackRepository.sendMessage(action, previousAction).then((actionResult: any) => {
          logger.debug(`slack action '${action.serviceAction.name}' is resolving`);
          d.resolve(actionResult);
        }).catch((error) => {
          logger.error(`slack action '${action.serviceAction.name}' is rejecting, ${error}`);
          d.reject(error);
        });
        break;
      default:
        d.resolve({});
        break;
    }

    return d.promise;
  }

  public static async handleWordpressAction(action: IMongoServiceActionInstance, previousAction: IMongoServiceActionInstance): Promise<any> {
    const d = Q.defer();
    logger.debug(`wordpress action '${action.serviceAction.name}' is starting`);

    switch (action.serviceAction.key) {
      case "get-last-posts-of-blog":
        WordpressRepository.getLastPosts(action, previousAction).then((actionResult: any) => {
          logger.debug(`wordpress action '${action.serviceAction.name}' is resolving`);
          d.resolve(actionResult);
        }).catch((error) => {
          logger.error(`wordpress action '${action.serviceAction.name}' is rejecting, ${error}`);
          d.reject(error);
        });
        break;
      case "post-to-wordpress":
        WordpressRepository.newPost(action, previousAction).then((actionResult: any) => {
          logger.debug(`wordpress action '${action.serviceAction.name}' is resolving`);
          d.resolve(actionResult);
        }).catch((error) => {
          logger.error(`wordpress action '${action.serviceAction.name}' is rejecting, ${error}`);
          d.reject(error);
        });
        break;
      default:
        logger.debug("handleWordpressAction default action");
        d.resolve({});
        break;
    }

    return d.promise;
  }
}