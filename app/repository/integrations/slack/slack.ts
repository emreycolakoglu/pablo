import * as Q from "q";
import * as slackNode from "slack-node";

export class Slack {
  /**
   * sends slack message
   * @param messageText
   * @param channel
   * @param webhookUrl
   */
  public static async send(messageText: string, channel: string, webhookUrl: string) {
    const slack = new slackNode();
    slack.setWebhook(webhookUrl);

    if (process.env.NODE_ENV == "test")
      channel = "test";

    const message = {
      channel: channel,
      username: "Pablo",
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