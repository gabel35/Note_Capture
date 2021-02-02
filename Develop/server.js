var express = require("express");
var fs = require("fs");
const db = "db/db.json";
const path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require("/routes/notesRoute.js")(app);

app.get("/api/notes", (req, res) => {
  const file = fs.readFileSync(db, "utf8");
  res.json(JSON.parse(file));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});