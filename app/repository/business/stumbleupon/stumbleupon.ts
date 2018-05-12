import * as Q from "q";
import {
  StumbleUponClient,
  StumbleUponPostResult
} from "../../integrations/stumbleUpon";
import logger from "../../../logger";
import {
  IMongoServiceActionInstance,
  IServiceActionInput,
  getInputWithName,
  inputNeedsReplacing,
  replacePlaceholderInInput
} from "../../../database/models";

export class StumbleuponRepository {
  public static async post(
    actionInstance: IMongoServiceActionInstance,
    previousActionInstance: IMongoServiceActionInstance
  ) {
    const d = Q.defer();

    try {
      const client = new StumbleUponClient(
        actionInstance.serviceInstance.username,
        actionInstance.serviceInstance.password
      );

      const url: IServiceActionInput = getInputWithName(
        actionInstance.inputs,
        "link"
      );
      if (inputNeedsReplacing(url.value))
        url.value = replacePlaceholderInInput(
          url.value,
          previousActionInstance.outputs
        );

      client
        .postToStumbleUpon(url.value, "Pornography", undefined, true, undefined)
        .then((stumbleuponResult: StumbleUponPostResult) => {
          const output: any = stumbleuponResult._success
            ? stumbleuponResult._success
            : `${JSON.stringify(stumbleuponResult._reason)}`;
          actionInstance.outputs = [];
          actionInstance.outputs.push({
            name: "success",
            key: "success",
            value: output,
            type: 1
          });

          return actionInstance.save();
        })
        .then((actionInstance: IMongoServiceActionInstance) => {
          logger.debug(`finished stumbleUpon post with success`);
          d.resolve(actionInstance);
        })
        .catch((error: any) => {
          logger.error(error.message);
          d.reject(error);
        });
    } catch (error) {
      d.reject(error);
    }

    return d.promise;
  }
}
