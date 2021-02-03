var express = require("express");
var fs = require("fs");
var db = "/db/db.json";
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/notesRoute.js")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});