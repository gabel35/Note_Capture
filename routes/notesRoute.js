var path = require("path");
var express = require("express");
var fs = require("fs");
var db = "db/db.json";

var app = express();

module.exports = function(app) {
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
}

module.exports = function(app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/api/notes", (req, res) => {
    const file = fs.readFileSync(db, "utf8");
    res.json(JSON.parse(file));
  });
  
  app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./db/db.json"));
  })

  app.get("/api/notes/:id", function(req, res) {
    let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(saveNotes[Number(req.params.id)]);
  })

  app.post("/api/notes", function(req, res) {
    let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let note = req.body;
    let id = (saveNotes.length).toString();
    note.id = id;
    saveNotes.push(note);

    fs.writeFileSync("./db/db.json", JSON.stringify(saveNotes));
    console.log(`Your note, ${note.title}, has been saved!`, note);
    res.json(saveNotes);
})

app.delete("/api/notes/:id", function(req, res) {
    let saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let note = req.body;
    let noteID = req.params.id;
    let newID = 0;
    console.log(`You deleted note #${noteID}.`);
    saveNotes = saveNotes.filter(currentNote => {
        return currentNote.id != noteID;
    })
    for (currentNote of saveNotes) {
        currentNote.id = newID.toString();
        newID++;
    }
  fs.writeFileSync("./db/db.json", JSON.stringify(saveNotes));
  res.json(saveNotes);
})
  
}