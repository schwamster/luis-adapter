var request = require("request");

function LuisAdapter(options) {
  this.appId = options.appId;
  this.subscriptionKey = options.subscriptionKey;
}

LuisAdapter.prototype.Query = function() {
  var x = request("http://www.sitepoint.com", function(error, response, body) {
    console.log("lasdfas");
  });
};

LuisAdapter.prototype.AppId = function() {
    return this.appId;
};

LuisAdapter.prototype.SubscriptionKey = function() {
    return this.subscriptionKey;
};

module.exports = LuisAdapter;
