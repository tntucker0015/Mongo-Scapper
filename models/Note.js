const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
 content: {
  title: String,
  body: String
 }
}, { timestamps: true })

const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
