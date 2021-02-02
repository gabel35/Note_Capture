var express = require("express");
var fs = require("fs");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./Develop/routes/notesRoute.js")(app);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "develop/public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "develop/public/notes.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
