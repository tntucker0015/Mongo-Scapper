var express =require("express");
var bodyParser = require("body-parser");
var logger = require('morgan');
var mongoose = require("mongoose");
var axios =require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/pokemonNews');

app.get("/scrape", function(req, res) {
  axios.get("https://www.pokemon.com/us/pokemon-news/").then(function(response) {
    var $ =cheerio.load(response.data);
    $("article h2").each(function(i, element) {
      var result ={};

      result.title =$(this)
        .children("a")
        .text();
      result.lin = $(this)
        .children("a")
        .attr("href");

      db.Article.create(result)
      .then(function(dbArticle) {
        console.log(dbArticle);
      })
      .catch(function(err) {
        return res.json(err);
      });
    });
    res.send("Scrape Complete");
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
  .then(function(dbArticle) {
    res,json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new:true });
  })
  .catch(function(err) {
    res.json(err);
  });
});

app.listen(PORT, function() {
  console.log("app running on PROT " + PORT + "!");
});