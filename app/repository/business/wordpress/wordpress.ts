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

                    // BURADAN DEVAM
                }
            }

        } catch (error) {
            logger.error(`${error.message}`);
            d.reject(error);
        }

        return d.promise;
    }
}