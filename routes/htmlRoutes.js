const request = require("request");
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

  app.get("/", (req, res) => {
    db.Article.find({
      saved: false}).sort({ "time": -1 }).exec((err, unsavedArticles) => {
        if (err) throw err
        res.render("index",{
          unsavedArticles
        });
      })
    });

    app.get("/saved",(req, res) => {
      db.Articles.find({
        saved: true
      }).sort({ "time": -1 }).exec((err, savedArticles) => {
        if (err) throw err
        res.render("saved", {
          savedArticles
        });
      })
    });
  }
