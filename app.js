var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({exteneded: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

//Server index page
app.get("/", function(req, res){
    res.send("Deployed");
});

//Facebook webhook
app.get("/webhook", function(req, res){
    if(req.query["hub.verify_token"] === "this_is_my_token"){
        console.log("verified webhook");

        res.status(200).send(req.query["hub.challenge"]);
    }else {
        console.log("Verification failed. The token do not match.");
        res.sendStatus(403);
    }
});