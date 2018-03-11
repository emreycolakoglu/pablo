import * as Q from "q";
import * as request from "request";
import logger from "../../../logger";
import { WordpressPostRequest, WordpressPostResponse, WordpressAuthData } from "./";

export class WordpressRepository {

  constructor(authData: WordpressAuthData) {
    this.authData = authData;
  }
  authData: WordpressAuthData;
  apiUrls: any = {
    post: "/wp/v2/posts",
    update: "/wp/v2/posts/",
    getCategories: "/wp/v2/categories"
  };

  /**
   * posts as draft
   * @param wordpressPostRequest
   */
  post(wordpressPostRequest: WordpressPostRequest): Q.Promise<WordpressPostResponse> {
    const d = Q.defer<WordpressPostResponse>();

    logger.info("wordpress raw: starting posting", wordpressPostRequest.title);
    const options: any = this.prepareClientOptions();
    options.url = this.authData.endpoint + this.apiUrls.post;
    options.body = {
      // "title" and "content" are the only required properties
      title: wordpressPostRequest.title,
      content: wordpressPostRequest.content,
      // Post will be created as a draft by default if a specific "status"
      // is not specified
      status: "draft",
      format: wordpressPostRequest.format,
      categories: wordpressPostRequest.categories,
      meta: {
        external_thumbnail: wordpressPostRequest.thumbnail
      }
    };
    request.post(options, function (err, httpResponse, response: WordpressPostResponse) {
      if (!err && httpResponse.statusCode > 199 && httpResponse.statusCode < 301) {
        logger.info("success", response.id);
        d.resolve(response);
      }
      else {
        logger.error(err);
        d.reject(err);
      }
    });

    return d.promise;
  }

  /**
   * publishes post
   * @param postId
   */
  publish(postId: number): Q.Promise<WordpressPostResponse> {
    const d = Q.defer<WordpressPostResponse>();

    const options: any = this.prepareClientOptions();
    options.url = this.authData.endpoint + this.apiUrls.update + postId;
    options.body = {
      status: "publish"
    };
    request.post(options, function (err, httpResponse, response: WordpressPostResponse) {
      if (!err && httpResponse.statusCode > 199 && httpResponse.statusCode < 301) {
        d.resolve(response);
      }
      else {
        d.reject(err);
      }
    });

    return d.promise;
  }

  update(wordpressPostRequest: WordpressPostRequest, postId: number) {
    const d = Q.defer();

    const options: any = this.prepareClientOptions();
    options.url = this.authData.endpoint + this.apiUrls.update + postId;
    options.body = {
      // "title" and "content" are the only required properties
      title: wordpressPostRequest.title,
      content: wordpressPostRequest.content,
      // Post will be created as a draft by default if a specific "status"
      // is not specified
      status: wordpressPostRequest.status,
      format: wordpressPostRequest.format,
      categories: wordpressPostRequest.categories,
      meta: {
        external_thumbnail: wordpressPostRequest.thumbnail
      }
    };
    request.post(options, function (err, httpResponse, response) {
      if (!err && httpResponse.statusCode > 199 && httpResponse.statusCode < 301) {
        d.resolve(response);
      }
      else {
        d.reject(err);
      }
    });

    return d.promise;
  }

  prepareClientOptions() {
    logger.info("wordpress raw: starting preparing client options");
    const options = {
      json: true,
      headers: {
        "User-Agent": "Pablo"
      },
      auth: {
        "user": "" + this.authData.username,
        "pass": "" + this.authData.password,
        "sendImmediately": true
      }
    };
    return options;
  }
}