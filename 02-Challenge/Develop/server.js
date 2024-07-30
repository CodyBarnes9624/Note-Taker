const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading notes');
    } else {
      console.log('yep',data);
      res.json(JSON.parse(data));
    }
  });
});
console.log('test',)


app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = { id: uuidv4(), title, text };

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading notes');
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving note');
        } else {
          res.json(newNote);
        }
      });
    }
  });
});


app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading notes');
    } else {
      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== id);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error deleting note');
        } else {
          res.send('Note deleted');
        }
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});