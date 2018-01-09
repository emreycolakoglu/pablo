process.env.NODE_ENV = 'test';
import * as mocha from 'mocha';
import * as chai from 'chai';

import { StumbleUpon } from "./stumbleupon";

const should = chai.should();

describe('bitly', () => {
  it.only('should shorten urls', () => {
    let client = new StumbleUpon("atostle2", "987541a");
    return client.postToStumbleUpon("http://www.google.com/doodles", "Internet Tools").then(function (result) {
      result.should.have.property("_success");
      result["_success"].should.be.eql(true);
    });
  });
});