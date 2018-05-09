process.env.NODE_ENV = "test";
import * as mocha from "mocha";
import * as chai from "chai";

import { StumbleUponClient } from "./stumbleupon";

const should = chai.should();

describe("stumbleupon", () => {
  /*it("should submit urls", () => {
    const client = new StumbleUponClient("atostle2", "987541a");
    return client.postToStumbleUpon("http://www.google.com/doodles", "Internet Tools").then(function (result) {
      result.should.have.property("_success");
      result["_success"].should.be.eql(true);
    });
  });*/
});