process.env.NODE_ENV = "test";
import * as mocha from "mocha";
import * as chai from "chai";

import {
  getHotListOf,
  getSinglePost,
  getCommentsOfPost,
  forceSsl,
  getNewListOf,
  getTopListOf
} from "./reddit";

const should = chai.should();

describe("reddit", function() {
  it("should get comments of a post", function() {
    return getCommentsOfPost(
      "https://www.reddit.com/r/RealGirls/comments/6ejxwy/college_fun/"
    ).then(function(result) {
      result.should.be.a("array");
    });
  });
  it("should parse post", function() {
    return getSinglePost(
      "https://www.reddit.com/r/RealGirls/comments/6ejxwy/college_fun/"
    ).then(function(result) {
      result.should.have.property("data");
      result.data.id.should.be.eql("6ejxwy");
    });
  });
  it("should parse hot posts of subreddit", function() {
    return getHotListOf("r/RealGirls").then(function(result) {
      result.should.be.a("array");
    });
  });
  it("should parse new posts of subreddit", function() {
    return getNewListOf("r/RealGirls").then(function(result) {
      result.should.be.a("array");
    });
  });
  it("should parse top posts of subreddit", function() {
    return getTopListOf("r/RealGirls").then(function(result) {
      result.should.be.a("array");
    });
  });
  it("should force https on media urls", function() {
    const newUrl = forceSsl("http://i.imgur.com/A1S2D3");
    newUrl.should.be.eql("https://i.imgur.com/A1S2D3");
  });
});
