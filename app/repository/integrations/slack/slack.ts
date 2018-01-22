import * as Q from "q";
import * as slackNode from "slack-node";

const webhookUri = "https://hooks.slack.com/services/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";

export class Slack {
  /**
   * sends slack message
   * @param messageText
   * @param channel
   */
  public static async send(messageText: string, channel: string) {
    const slack = new slackNode();
    slack.setWebhook(webhookUri);

    if (process.env.NODE_ENV == "test")
      channel = "test";

    const message = {
      channel: channel,
      username: "API",
      icon_emoji: ":robot_face:",
      text: messageText
    };

    const d = Q.defer();
    slack.webhook(message, function (err, response) {
      if (err) {
        d.reject(err);
      }
      else {
        d.resolve(response);
      }
    });

    return d.promise;
  }
}