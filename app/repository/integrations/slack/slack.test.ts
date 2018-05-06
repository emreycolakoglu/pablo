process.env.NODE_ENV = "test";
import * as mocha from "mocha";
import * as chai from "chai";

import { Slack } from "./slack";

const should = chai.should();

describe("slack", function() {
  it("should send stuff", function() {
    return Slack.send(
      "test",
      "#test",
      "https://hooks.slack.com/services/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"
    ).then(function(result) {
      result.should.be.a("object");
    });
  });
});
