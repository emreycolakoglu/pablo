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

export class RedditRepository {
  public static async checkHotPost(actionInstance: IMongoServiceActionInstance) {
    const d = Q.defer();

    try {
      /** subreddit ismini oku */
      const subreddit: IServiceActionInput = getInputWithName(actionInstance.serviceAction.inputs, "subreddit");
      /** postları çek */
      const redditPosts: RedditT3Link[] = await getHotListOf(subreddit.value);
      const ids: string[] = redditPosts
        .filter(item => item.data.stickied == false)
        .map(item => item.data.id);

      if (actionInstance.payload && actionInstance.payload.length > 0) {
        const newIds = difference(actionInstance.payload as string[], ids);
        if (newIds && newIds.length > 0) {
          // yeni post var
          const newPost = redditPosts.find(item => item.data.id == newIds[0]);
          d.resolve(newPost);
        }
        else {
          d.resolve(false);
        }
      }
      else {
        actionInstance.payload = ids;
        await actionInstance.save();
        d.resolve(false);
      }
    } catch (error) {
      d.reject(error);
    }

    return d.promise;
  }
}