const fs = require("fs");
const uuid = require('uuid');
let notesArray = require("../../db/db.json")

module.exports = function(app) {

//gets json file
app.get("/api/notes", function(req,res){
    return res.json(notesArray)})
  
//posts a new note to array with an id
  app.post("/api/notes",function(req,res){
    const newNote = req.body
    newNote.id = uuid.v4();
    notesArray.push(newNote);
    let jsonNotes = JSON.stringify(notesArray)
    fs.writeFile("./db/db.json", jsonNotes, function(err) {if(err) throw err; console.log("Note saved");})
    res.json(true)
  })

//deletes note from array depending on object id
  app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;

    notesArray.forEach(function (selectedNote, idNum) {
      if(id == selectedNote.id){notesArray.splice(idNum,1)
        const dbFile = notesArray.slice();
        let jsonNotes = JSON.stringify(dbFile)
        console.log(dbFile)
        fs.writeFile("./db/db.json", jsonNotes, function(err) {if (err) throw err; console.log("Note deleted");})
      }
    })
    res.json(true);
  })
}