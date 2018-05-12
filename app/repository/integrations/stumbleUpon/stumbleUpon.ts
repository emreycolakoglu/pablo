import * as Q from "q";
import * as request from "request";
import * as cheerio from "cheerio";
import { StumbleUponPostResult } from "./";

export class StumbleUponClient {
  constructor(username: string, password: string) {
    this._username = username;
    this._password = password;
    this._cookieJar = request.jar();
    this._urls = {
      HOMEPAGE: "https://www.stumbleupon.com",
      LOGINPAGE: "https://www.stumbleupon.com/login",
      SUBMITPAGE: "http://www.stumbleupon.com/submit"
    };
  }
  private _username: string;
  private _password: string;
  private _cookieJar: request.CookieJar;
  private _urls: any;

  public postToStumbleUpon(
    link: string,
    cat: string,
    message: string = "",
    nsfw: boolean = false,
    tags: any = undefined
  ): Q.Promise<StumbleUponPostResult> {
    const d = Q.defer<StumbleUponPostResult>();
    const self = this;

    self
      .login()
      .then(function(result) {
        return self.post(link, cat, message, nsfw, tags);
      })
      .then(function(result) {
        const resultAsStr = JSON.parse(result);
        d.resolve(resultAsStr);
      })
      .catch(function(error) {
        d.reject(error);
      });

    return d.promise;
  }

  /**
   * header yarat
   * @param referrer
   * @param post
   * @param ajax
   */
  private getHeaders(
    referrer: string,
    post: boolean = false,
    ajax: boolean = false
  ): any {
    const headers: any = {};
    if (ajax) {
      headers["X-Requested-With"] = "XMLHttpRequest";
    }
    headers["Connection"] = "keep-alive";
    headers["Referer"] = referrer;
    headers["User-Agent"] =
      "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
    if (post) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (ajax) {
      headers["Accept"] = "application/json, text/javascript, */*; q=0.01";
    } else {
      headers["Accept"] =
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
    }
    headers["Origin"] = "https://www.stumbleupon.com";

    headers["Accept-Language"] = "en-US,en;q=0.8";
    headers["Accept-Charset"] = "ISO-8859-1,utf-8;q=0.7,*;q=0.3";
    return headers;
  }

  /**
   * cheerio ile data çıkarır
   * @param body
   * @param selector
   */
  private extractData(body: string, selector: string) {
    let $ = cheerio.load(body);
    const value = $(selector).val();
    $ = undefined;
    return value;
  }

  /**
   * requestjs requesti için config hazırlar
   * @param method
   * @param url
   * @param headers
   * @param fields
   */
  private getRequestOptions(
    method: string,
    url: string,
    headers: any,
    fields: any
  ) {
    const options = {
      method: method,
      url: url,
      headers: headers,
      form: fields,
      jar: this._cookieJar
    };
    return options;
  }

  private login() {
    const d = Q.defer();
    const self = this;

    const pageHeaders = self.getHeaders(self._urls.LOGINPAGE, false, false);
    const pageRequestOptions = self.getRequestOptions(
      "GET",
      self._urls.LOGINPAGE,
      pageHeaders,
      undefined
    );

    request(pageRequestOptions, function(error, response, body) {
      if (error) {
        d.reject(error);
      } else {
        const loginFormToken = self.extractData(body, "input#token");
        const fields: any = {
          user: self._username,
          pass: self._password,
          _token: loginFormToken,
          _output: "Json",
          remember: "true",
          nativeSubmit: "0",
          _action: "auth",
          _method: "create"
        };
        const loginRequestHeaders = self.getHeaders(
          self._urls.LOGINPAGE,
          true,
          true
        );
        const loginRequestOptions = self.getRequestOptions(
          "POST",
          self._urls.LOGINPAGE,
          loginRequestHeaders,
          fields
        );

        request(loginRequestOptions, function(error, response, body) {
          if (error) {
            d.reject(error);
          } else {
            d.resolve(body);
          }
        });
      }
    });

    return d.promise;
  }

  private post(
    link: string,
    cat: string,
    message: string = "",
    nsfw: boolean = false,
    tags: any = undefined
  ): Q.Promise<string> {
    const d = Q.defer<string>();
    const self = this;

    const postPageHeaders = self.getHeaders(
      self._urls.SUBMITPAGE,
      false,
      false
    );
    const postPageOptions = self.getRequestOptions(
      "GET",
      self._urls.SUBMITPAGE,
      postPageHeaders,
      undefined
    );

    request(postPageOptions, function(error, response, body) {
      if (error) {
        d.reject(error);
      } else {
        const postPageToken = self.extractData(body, "input[name='_token']");
        const fields = {
          url: link,
          _token: postPageToken,
          _output: "Json",
          language: "EN",
          nativeSubmit: "0",
          _action: "submitUrl",
          _method: "create",
          review: message,
          tags: cat,
          nsfw: nsfw ? "true" : "false",
          "user-tags": tags
        };

        const postRequesHeaders = self.getHeaders(
          self._urls.SUBMITPAGE,
          true,
          true
        );
        const postRequestOptions = self.getRequestOptions(
          "POST",
          self._urls.SUBMITPAGE,
          postRequesHeaders,
          fields
        );
        request(postRequestOptions, function(error, response, body) {
          if (error) {
            d.reject(error);
          } else {
            d.resolve(body);
          }
        });
      }
    });

    return d.promise;
  }
}
