import * as Q from "q";
import * as request from "request";

export class HttpRepository {
  public static async checkIfFileExists(url: string): Promise<boolean> {
    const d = Q.defer<boolean>();

    request(
      {
        url: url,
        method: "HEAD"
      },
      function(error, httpResponse, body) {
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 300) {
          d.resolve(true);
        } else d.resolve(false);
      }
    );

    return d.promise;
  }
}
