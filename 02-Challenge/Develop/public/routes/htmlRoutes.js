const path = require('path');

module.exports = function(app) {
  // Gets home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });

  // Gets notes page
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
  });
};