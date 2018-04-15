import * as Q from "q";
import { getInputWithName, replacePlaceholderInInput, IServiceActionInput, IMongoServiceActionInstance, inputNeedsReplacing } from "../../../database/models";
import { WordpressIntegration, WordpressPostResponse, WordpressPostRequest, WordpressAuthData, WordpressAjaxPost } from "../../integrations/wordpress";
import { difference } from "lodash";
import logger from "../../../logger";

export class WordpressRepository {
  public static async getLastPosts(actionInstance: IMongoServiceActionInstance, previousActionInstance: IMongoServiceActionInstance) {
    const d = Q.defer();

    logger.debug(`starting wordpress getlastpots`);
    try {
      const endpoint: IServiceActionInput = getInputWithName(actionInstance.inputs, "endpoint");

      const wpClient = new WordpressIntegration({
        endpoint: endpoint.value,
        username: undefined,
        password: undefined
      });
      const wpPosts: WordpressAjaxPost[] = await wpClient.getLastPosts();
      const ids: number[] = wpPosts.map(post => post.id);
      logger.debug(`wordpress last post length ${ids.length}`);

      if (actionInstance.payload && actionInstance.payload.length > 0) {
        const newIds = difference(ids, actionInstance.payload as number[]);
        if (newIds && newIds.length > 0) {
          logger.debug(`found ${newIds.length} new posts`);
          const newPost = wpPosts.find(item => item.id == newIds[0]);

          actionInstance.outputs = [];
          actionInstance.outputs.push({
            name: "title",
            key: "title",
            value: newPost.title,
            type: 1
          });

          actionInstance.outputs.push({
            name: "url",
            key: "url",
            value: newPost.link,
            type: 1
          });

          actionInstance.payload = ids;
          await actionInstance.save();

          d.resolve(actionInstance);
        }
        else {
          // yeni bir post bulamadik
          // outputlari temizle
          actionInstance.outputs = [];
          await actionInstance.save();
          logger.debug(`couldn't find new post`);
          d.resolve(actionInstance);
        }
      }
      else {
        // daha onceden hic post datasi kaydetmemisiz
        // bir sonraki check icin payload guncelle
        actionInstance.payload = ids;
        await actionInstance.save();
        d.resolve(actionInstance);
      }
    } catch (error) {
      logger.error(`${error.message}`);
      d.reject(error);
    }

    return d.promise;
  }

  public static async newPost(actionInstance: IMongoServiceActionInstance, previousActionInstance: IMongoServiceActionInstance) {
    const d = Q.defer();

    logger.debug(`starting wordpress newPost`);
    try {
      const endpoint: IServiceActionInput = getInputWithName(actionInstance.inputs, "endpoint");
      const username: string = actionInstance.serviceInstance.username;
      const password: string = actionInstance.serviceInstance.password;

      const title: IServiceActionInput = getInputWithName(actionInstance.inputs, "title");
      if (inputNeedsReplacing(title.value))
      title.value = replacePlaceholderInInput(title.value, previousActionInstance.outputs);

      const thumbnail: IServiceActionInput = getInputWithName(actionInstance.inputs, "thumbnail");
      if (inputNeedsReplacing(title.value))
      thumbnail.value = replacePlaceholderInInput(thumbnail.value, previousActionInstance.outputs);

      const wpClient = new WordpressIntegration({
        endpoint: endpoint.value,
        username: username,
        password: password
      });

      const newPost = await wpClient.post({
        title: title.value,
        // TODO PREPARE CONTENT
        content: "",
        format: "image",
        categories: 1,
        thumbnail: thumbnail.value
      });

      // TODO PUBLISH

    } catch (error) {
      logger.error(`${error.message}`);
      d.reject(error);
    }

    return d.promise;
  }
}