var assert = require('assert');

describe('luis-adapter', function() {
  describe('init', function () {
    it('should return the adapter with api-id and subscriptionid', function () {

      var options = {};
      options.appId = "abc";
      options.subscriptionKey = "123"
      var LuisAdapter = require("../index");
      var luisAdapter = new LuisAdapter(options);

      assert.equal(options.appId, luisAdapter.AppId());
      assert.equal(options.subscriptionKey, luisAdapter.SubscriptionKey());
    });
  });

  describe('query', function () {
    it('query with valid appid and subscriptionKey', function () {

      var options = {};
      options.appId = "abc";
      options.subscriptionKey = "123"
      var LuisAdapter = require("../index");
      var luisAdapter = new LuisAdapter(options);

      assert.equal("some answer", luisAdapter.Query());
    });
  });
});
