const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  time: {
    type: Date
  },
  saved: {
    type: Boolean,
    default: false
  },
  note: [
    {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
]
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;