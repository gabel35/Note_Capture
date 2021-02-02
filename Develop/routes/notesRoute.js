var path = require("path");

module.exports = function(app) {
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
}

module.exports = function(app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/api/notes", (req, res) => {
    const file = fs.readFileSync(db, "utf8");
    res.json(JSON.parse(file));
  });
  
  app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"));
  })

  app.get("/api/notes/:id", function(req, res) {
    let savedNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNote[Number(req.params.id)]);
})
  
}