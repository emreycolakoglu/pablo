process.env.NODE_ENV = "test";
import * as mocha from "mocha";
import * as chai from "chai";

import { WordpressRepository, WordpressAuthData } from "./";

const should = chai.should();

describe("wordpress", () => {
  it("should create posts", () => {
    const authOptions: WordpressAuthData = {
      endpoint: undefined,
      password: undefined,
      username: undefined
    };
    const client = new WordpressRepository(authOptions);
    return client.post({
      categories: undefined,
      content: undefined,
      format: undefined,
      title: undefined,
      status: undefined,
      thumbnail: undefined
    }).then(function (result) {
      result.should.have.property("_success");
      result["_success"].should.be.eql(true);
    });
  });
});