/**
 * burası business logic için
 */

import * as Q from "q";
import {
  getInputWithName,
  replacePlaceholderInInput,
  IServiceActionInput,
  IMongoServiceActionInstance,
  inputNeedsReplacing
} from "../../../database/models";
import { Slack } from "../../integrations/slack";
import { difference } from "lodash";
import logger from "../../../logger";

export class SlackRepository {
  public static async sendMessage(
    actionInstance: IMongoServiceActionInstance,
    previousActionInstance: IMongoServiceActionInstance
  ) {
    const d = Q.defer();

    logger.debug(`starting sendMessage`);
    try {
      const messageInput: IServiceActionInput = getInputWithName(
        actionInstance.inputs,
        "message"
      );
      if (inputNeedsReplacing(messageInput.value))
        messageInput.value = replacePlaceholderInInput(
          messageInput.value,
          previousActionInstance.outputs
        );

      const channelInput: IServiceActionInput = getInputWithName(
        actionInstance.inputs,
        "channel"
      );
      if (inputNeedsReplacing(channelInput.value))
        channelInput.value = replacePlaceholderInInput(
          channelInput.value,
          previousActionInstance.outputs
        );

      const webHookUrlInput: IServiceActionInput = getInputWithName(
        actionInstance.inputs,
        "webHookUrl"
      );
      if (inputNeedsReplacing(webHookUrlInput.value))
        webHookUrlInput.value = replacePlaceholderInInput(
          webHookUrlInput.value,
          previousActionInstance.outputs
        );

      logger.debug(`slack repository prepared data to be sent`);

      Slack.send(messageInput.value, channelInput.value, webHookUrlInput.value)
        .then((result: any) => {
          actionInstance.outputs = [];
          actionInstance.outputs.push({
            name: "success",
            key: "success",
            value: true,
            type: 1
          });
          return actionInstance.save();
        })
        .then(() => {
          d.resolve(actionInstance);
        });
    } catch (error) {
      logger.error(error);
      actionInstance.outputs = [];
      await actionInstance.save();
      d.resolve(actionInstance);
    }

    return d.promise;
  }
}
