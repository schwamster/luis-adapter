var request = require("request");
var sprintf = require("sprintf-js").sprintf;

function LuisAdapter(options) {
  this.appId = options.appId;
  this.subscriptionKey = options.subscriptionKey;

  this.baseUrl = "https://api.projectoxford.ai/luis";
  this.ApiVersion = "v1";
  this.urlFormat = "%1$s/%2$s/application";
}

LuisAdapter.prototype.Query = function(query, callback, error) {
  var url = sprintf(this.urlFormat, this.baseUrl, this.ApiVersion);
  var parameter = {"id": this.appId, "subscription-key": this.subscriptionKey, q: query};
  request.get({url:url, qs:parameter}, function(err, response, body) {
    if (!err && response.statusCode == 200){
      callback(JSON.parse(body));
    }
    else {
      //console.log(response.request.uri.href);
      //console.log(response.body);
      console.log(err);
      error(err, response.statusCode);
    }
  });
};

LuisAdapter.prototype.GetAppId = function() {
    return this.appId;
};

LuisAdapter.prototype.GetSubscriptionKey = function() {
    return this.subscriptionKey;
};

module.exports = LuisAdapter;
