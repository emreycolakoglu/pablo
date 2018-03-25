import * as Q from "q";
import { IServiceActionInstance, IMongoServiceActionInstance } from "../../../database/models";
import { RedditRepository } from "../reddit";

export class ActionRepository {

  /**
   * this action must distinguish between service actions of a service
   * @param action
   * @param previousAction
   */
  public static async handleRedditAction(action: IMongoServiceActionInstance, previousAction: IMongoServiceActionInstance): Promise<any> {
    const d = Q.defer();

    switch (action.serviceAction.key) {
      case "":
        RedditRepository.checkHotPost(action, previousAction).then((actionResult: any) => {
          d.resolve(actionResult);
        }).then(() => {
          d.reject();
        });
        break;
      default:
        break;
    }

    return d.promise;
  }
}