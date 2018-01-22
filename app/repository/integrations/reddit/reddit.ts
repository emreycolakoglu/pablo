import * as Q from "q";
import * as request from "request";
import { RedditListingEntity, RedditT3Link, RedditT1Comment } from "./";
import logger from "../../../logger";

export async function getHotListOf(source: string): Promise<RedditT3Link[]> {
  const d = Q.defer<RedditT3Link[]>();

  const client = {
    json: true,
    method: "GET",
    url: `https://www.reddit.com/${source}/hot/.json`
  };
  request(client, function (err: any, httpResponse: any, result: RedditListingEntity) {
    if (!err && httpResponse.statusCode == 200) {
      if (result && result.data && result.data.children) {
        d.resolve(result.data.children);
      }
      else {
        d.reject({ message: "Reddit, getHotListOf, children yok galiba" });
      }
    }
    else {
      logger.error("reddit provider: get comments error", err);
      d.reject(err);
    }
  });

  return d.promise;
}

export async function getSinglePost(postLink: string): Promise<RedditT3Link> {
  const d = Q.defer<RedditT3Link>();

  const client = {
    json: true,
    method: "GET",
    url: postLink.replace(/[^\w.:/\s]/gi, "") + ".json"
  };

  request(client, function (err: any, httpResponse: any, result: RedditListingEntity[]) {
    if (!err && httpResponse.statusCode == 200) {
      if (result && result[0] && result[0].data.children.length > 0) {
        d.resolve(result[0].data.children[0]);
      }
      else {
        d.reject({ message: "Reddit, getSinglePost, children yok galiba" });
      }
    }
    else {
      logger.error(err);
      d.reject(err);
    }
  });

  return d.promise;
}

export async function getCommentsOfPost(postLink: string): Promise<string[]> {
  const d = Q.defer<string[]>();

  const client = {
    json: true,
    method: "GET",
    url: postLink.replace(/[^\w.:/\s]/gi, "") + ".json"
  };

  request(client, function (err: any, httpResponse: any, result: RedditListingEntity[]) {
    if (!err && httpResponse.statusCode == 200) {
      if (result && result[1] && result[1].data.children.length > 0) {
        const r: string[] = result[1].data.children.map((comment: RedditT1Comment) => comment.data.body);
        logger.debug(`${r.length} comments scraped`);
        d.resolve(r);
      }
      else {
        logger.debug(`0 comments scraped`);
        d.resolve([]);
      }
    }
    else {
      logger.error("reddit provider: get comments error", err);
      d.reject(err);
    }
  });

  return d.promise;
}