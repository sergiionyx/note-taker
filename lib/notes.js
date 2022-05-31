const fs = require("fs");
const path = require("path");

function createNewNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (
        !note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
}

function findById(id, notes) {
    const result = notes.filter((note) => note.id === id)[0];
    return result;
}

function deleteNote(id, oldNotes) {
    const removeIndex = oldNotes.map((item) => { return item.id }).indexOf(id);
    console.log(removeIndex);

    oldNotes.splice(removeIndex, 1);

    let notes = oldNotes.filter(function (oldNotes) {
        return oldNotes.id !== id;
    });

    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes }, null, 2)
    );

    return removeIndex;
}

module.exports = {
    createNewNote,
    validateNote,
    findById,
    deleteNote
};