//MovieSearch Web app

var express = require("express");
var app = express();
var request = require("request");

//set the default file type to "ejs"
app.set("view engine", "ejs");

//set up home page
app.get("/", function (req, res){
  res.render("searchHome");
});

//set up results page
app.get("/results", function(req, res){
  var movieID = req.query.searchID;
  var url = "http://www.omdbapi.com/?s=" + movieID + "&apikey=16d53d20";
  request(url, function(error, response, body) {
  if (!error && response.statusCode == 200) {
      var movieData = JSON.parse(body);
      res.render("results", {data: movieData});
      console.log("API integration successful");
    }
  });
});

//set up error page
app.get("*", function (req, res){
  res.send("Error! Page not found");
});

//set up local server
app.listen("3000", function () {
  console.log("Server has started on port 3000");
});
