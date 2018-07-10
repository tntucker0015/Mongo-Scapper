const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const cheerio = require("cheerio");

const PORT = process.env.PORT || 8080;


const databaseURI='mongodb://localhost:27017/GameNewsdb';

const db = mongoose.conection;

const app = express();


app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseURI);
}

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});




