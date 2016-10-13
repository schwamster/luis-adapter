var request = require("request");

function LuisAdapter(options) {
  this.appId = options.appId;
  this.subscriptionKey = options.subscriptionKey;
  
  this.baseUrl = "https://api.projectoxford.ai/luis";
  this.ApiVersion = "v1";
}

LuisAdapter.prototype.query = function(query, callback, error) {
  var url = `${this.baseUrl}/${this.ApiVersion}/application`
  var parameter = {"id": this.appId, "subscription-key": this.subscriptionKey, q: query};
  return new Promise((resolve, reject) => {
    request.get({
      url: url,
      qs: parameter
    }, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        callback ? callback(JSON.parse(body)) : resolve(JSON.parse(body));
      } else {
        console.log(err);
        error ? error(err, response.statusCode) : reject(err, response ? response.statusCode : void 0);
      }
    });
  });
};

LuisAdapter.prototype.getIntent = function(luisResponse) {
  var bestMatch, i, intent, len, ref;
  bestMatch = null;

  try {
    ref = luisResponse["intents"];
    for (i = 0, len = ref.length; i < len; i++) {
      intent = ref[i];
      if ((bestMatch == null) || intent.score > bestMatch.score) {
        bestMatch = intent;
      }
    }
  } catch (undefined) {}

  return bestMatch != null ? bestMatch.intent : void 0;
};

LuisAdapter.prototype.getAppId = function() {
    return this.appId;
};

LuisAdapter.prototype.getSubscriptionKey = function() {
    return this.subscriptionKey;
};

module.exports = LuisAdapter;
