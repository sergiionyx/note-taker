const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { notes } = require("../../db/db.json");
const {
  findById,
  createNewNote,
  validateNote,
  deleteNote,
} = require("../../lib/notes");


router.get("/notes", (req, res) => {
  res.send(notes);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.delete("/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post("/notes", (req, res) => {
    let newId = notes.length;
    req.body.id = newId.toString();

  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
