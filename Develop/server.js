var express = require("express");
var fs = require("fs");
const db = "db/db.json";
const path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/notesRoute.js")(app);



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});