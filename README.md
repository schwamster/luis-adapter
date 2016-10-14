# luis-adapter

this is an inoffcial luis api client that helps u to integrate luis into your application.
to get you started with luis (Language Understanding Intelligent Service) visit the follwing
page https://www.luis.ai/


##install

npm install luis-adapter

##usage
    var LuisAdapter = require("luis-adapter").LuisAdapter;

    var options = {appId: "c413b2ef-382c-45bd-8ff0-f76d60e2a821", subscriptionKey: "#YOURSUBSCRIPTIONKEY#"};

    var query = "set up an appointment at 2:00 pm tomorrow for 90 minutes called discuss budget";

    var luisAdapter = new LuisAdapter(options);

      luisAdapter.Query(query,
        function(data){
          console.log("Luis thinks this is your intent:" + luisAdapter.GetIntent(data));
          console.log(data);
          },
        function(error){
          console.log(error);
          });


##Tests
mocha is used for testing.

to run the test u need to set an environmentvariable named LuisSubscriptionKey
to your own luis subscription.

then run npm run test

##Contributing & Building
Everybody is welcome to contribute to this project. I will resolve pull requests as soon as possible.
Source files are in Typescript in the src folder, so you will need to install typescript.


##Breaking Changes
Since version 0.0.52 some things have changed:
- methods now follow js conventions -> GetIntent => getIntent...
- there is no default export anymore -> so in es5 import: 
    var LuisAdapter = require("luis-adapter").LuisAdapter;
instead of
    var LuisAdapter = require("luis-adapter");