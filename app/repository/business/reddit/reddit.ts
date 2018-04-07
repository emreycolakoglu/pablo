/**
 * burası business logic için
 * get hot post in reddit dendiğinde
 * reddit entegrasyonunu kullanarak datayı çekip, bu dosyadaki business
 * kurallarını kullanarak cevap vermeli
 */

import * as Q from "q";
import { getInputWithName, IServiceActionInput, IMongoServiceActionInstance } from "../../../database/models";
import { getHotListOf, RedditT3Link } from "../../integrations/reddit";
import { difference } from "lodash";
import logger from "../../../logger";

export class RedditRepository {
  public static async checkHotPost(actionInstance: IMongoServiceActionInstance, previousActionInstance: IMongoServiceActionInstance) {
    const d = Q.defer();

    logger.debug(`starting checkHotPost`);
    try {
      /** subreddit ismini oku */
      const subreddit: IServiceActionInput = getInputWithName(actionInstance.inputs, "name");
      /** postları çek */
      const redditPosts: RedditT3Link[] = await getHotListOf((subreddit as any).value);
      logger.debug(`got ${redditPosts.length} posts`);

      const ids: string[] = redditPosts
        .filter(item => item.data.stickied == false)
        .map(item => item.data.id);
        logger.debug(`filtered stickied posts, got ${ids.length} left`);

      if (actionInstance.payload && actionInstance.payload.length > 0) {
        // aksiyonda bi onceki islemden gelen data var, reddit servisinden gelen data ile karsilastir
        const newIds = difference(ids, actionInstance.payload as string[]);
        if (newIds && newIds.length > 0) {
          // yeni post var
          logger.debug(`found ${newIds.length} new posts`);
          const newPost = redditPosts.find(item => item.data.id == newIds[0]);

          actionInstance.outputs = [];
          actionInstance.outputs.push({
            name: "title",
            key: "title",
            value: newPost.data.title,
            type: 1
          });
          actionInstance.outputs.push({
            name: "imageUrl",
            key: "imageUrl",
            value: newPost.data.url,
            type: 1
          });
          actionInstance.outputs.push({
            name: "comments",
            key: "comments",
            value: "",
            type: 1
          });

          // bir sonraki check icin payload guncelle
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
      d.reject("test");
    }

    return d.promise;
  }
}