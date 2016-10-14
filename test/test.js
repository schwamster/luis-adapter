var assert = require('assert');
var fs = require('fs');



describe('luis-adapter', function() {
  describe('init', function () {
    it('should return the adapter with api-id and subscriptionid', function () {

      var options = {};
      options.appId = "abc";
      options.subscriptionKey = "123"
      var LuisAdapter = require("../dist/index").LuisAdapter;
      var luisAdapter = new LuisAdapter(options);

      assert.equal(options.appId, luisAdapter.getAppId());
      assert.equal(options.subscriptionKey, luisAdapter.getSubscriptionKey());
    });
  });

  describe('query', function () {
    it('query with valid appid and subscriptionKey', function (done) {

      var options = {};
      options.appId = "c413b2ef-382c-45bd-8ff0-f76d60e2a821";
      options.subscriptionKey = process.env.LuisSubscriptionKey;
      var query = "set up an appointment at 2:00 pm tomorrow for 90 minutes called discuss budget";
      var LuisAdapter = require("../dist/index").LuisAdapter;
      var luisAdapter = new LuisAdapter(options);
      luisAdapter.query(query, function(data){

          var intent = luisAdapter.getIntent(data);
          assert.equal("builtin.intent.calendar.create_calendar_entry", intent);
          assert.equal("builtin.intent.calendar.create_calendar_entry", data.intents[0].intent);
          //todo flacky - should not test againts index x but check if ONE of the
          //entities equals the expected
          assert.equal("2:00 pm", data.entities[0].entity);
          assert.equal("builtin.calendar.start_time", data.entities[0].type);
          assert.equal("tomorrow", data.entities[1].entity);
          assert.equal("builtin.calendar.start_date", data.entities[1].type);
          done();
      })
    });
  });

  describe('GetIntent', function () {
    it('should return the best matching intent returned from luis', function () {

      var options = {};
      options.appId = "abc";
      options.subscriptionKey = "123"
      var LuisAdapter = require("../dist/index").LuisAdapter;
      var luisAdapter = new LuisAdapter(options);
      var mockLuisResponse = JSON.parse(fs.readFileSync("./test/mockResponse.json", 'utf8'));

      assert.equal("RunTests", luisAdapter.getIntent(mockLuisResponse));
    });
  });

  describe('GetIntent - no intent', function () {
    it('should return the best matching intent returned from luis', function () {

      var options = {};
      options.appId = "abc";
      options.subscriptionKey = "123"
      var LuisAdapter = require("../dist/index").LuisAdapter;
      var luisAdapter = new LuisAdapter(options);
      var mockLuisResponse = JSON.parse(fs.readFileSync("./test/mockResponseNoIntent.json", 'utf8'));

      assert.equal(null, luisAdapter.getIntent(mockLuisResponse));
    });
  });

  describe('GetIntent - one intent', function () {
    it('should return the best matching intent returned from luis', function () {

      var options = {};
      options.appId = "abc";
      options.subscriptionKey = "123"
      var LuisAdapter = require("../dist/index").LuisAdapter;
      var luisAdapter = new LuisAdapter(options);
      var mockLuisResponse = JSON.parse(fs.readFileSync("./test/mockResponseOneIntent.json", 'utf8'));

      assert.equal("RunTests", luisAdapter.getIntent(mockLuisResponse));
    });
  });

});
