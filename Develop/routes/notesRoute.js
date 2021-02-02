var path = require("path");

module.exports = function(app) {
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
}

module.exports = function(app) {

  app.get("/api/notes", (req, res) => {
    const file = fs.readFileSync(db, "utf8");
    res.json(JSON.parse(file));
  });
  
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  
}