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
  
  app.delete("/api/notes/:id", (req, res) => {
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
  })
}