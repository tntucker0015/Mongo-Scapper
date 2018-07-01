var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var NOteSchema = new Schema({
  title: String,
  body: String
});

var NOTE = mongoose.model("Note", NoteSchema);

module.exports = Note;