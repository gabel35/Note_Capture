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
    res.sendFile(path.join(__dirname, "../db/db.json"));
  })

  app.get("/api/notes", function(req, res) {
    let savedNote = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
    res.json(savedNote[Number(req.params.id)]);
  })

  app.post("/api/notes", (req, res) => {
    fs.readFile(db, (err, data) => {
      if (err) throw err;
      let newNote = { ...req.body, id: uuid() };
      let notesArr = JSON.parse(data);
      let updatedNotesArr = [...notesArr, newNote];

      fs.writeFileSync(db, JSON.stringify(updatedNotesArr));
      res.json(newNote);
    });
  });

  app.delete("/api/notes", (req, res) => {
    fs.readFile(db, "utf-8", (err, data) => {
      if (err) throw err;
      let id = req.params.id;
      let notesArr = JSON.parse(data);
  
      let deleteNote = _.find(notesArr, (note) => note.id === id);
  
      let updatedNotesArr = notesArr.filter(
        (note) => !_.isEqual(note, deleteNote)
      );
  
      fs.writeFileSync(db, JSON.stringify(updatedNotesArr));
      res.json(deleteNote);
    });
  });
  
}