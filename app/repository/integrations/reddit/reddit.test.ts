process.env.NODE_ENV = "test";
import * as mocha from "mocha";
import * as chai from "chai";

import { getHotListOf, getSinglePost, getCommentsOfPost } from "./reddit";

const should = chai.should();

describe("reddit", function () {
  it("should get comments of a post", function () {
    return getCommentsOfPost("https://www.reddit.com/r/RealGirls/comments/6ejxwy/college_fun/").then(function (result) {
      result.should.be.a("array");
    });
  });
  it("should parse post", function () {
    return getSinglePost("https://www.reddit.com/r/RealGirls/comments/6ejxwy/college_fun/").then(function (result) {
      result.should.have.property("data");
      result.data.id.should.be.eql("6ejxwy");
    });
  });
  it("should parse subreddit", function () {
    return getHotListOf("r/RealGirls").then(function (result) {
      result.should.be.a("array");
    });
  });
});